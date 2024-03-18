import cytoscape from 'cytoscape';
import { useContext, useMemo } from 'react';
import { DependencyProfile, OutSystemsDataLayers } from '../helpers/enums';
import { getParents } from '../../../helpers/node';
import { NodeData } from '../../../api';
import useColorShading from '../../../hooks/useColorShading';
import { DEFAULT_NODE_COLOR } from '../../../helpers/color';
import { VisualizationHistory } from '../../../context/VisualizationHistory';

/**
 * Given a node, get its dependency profile categorization. This function cannot be generalized for
 * any layered-like architecture, because the Dependency Profile is based on the Application-layer
 * as its upper layer. We cannot use the (sub)layer-layers, because by architecture standards these
 * (sub)layers are only categorizations of module types, but have no true architectural value.
 *
 * @param node
 * @param currentNodeId
 * @param allNodes All nodes in the visualization. If not given,
 * fetch it manually using the node reference
 * @returns DependencyProfile
 * @returns null if node not on the "Module" layer
 */
export default function getDependencyProfile(
  node: cytoscape.NodeSingular,
  currentNodeId?: string,
  allNodes?: NodeData[],
): DependencyProfile | null {
  // Dependency profiles are only defined on the module layer.
  if (node.data('properties.layer') !== 'Module') return null;

  const nodes: NodeData[] = allNodes ?? node.cy().nodes().map((n) => n.data());

  const nodeParents = getParents(node.data(), nodes);
  const hasCurrentNodeAsParent = nodeParents.some((p) => p.id === currentNodeId);
  if (!hasCurrentNodeAsParent) return null;

  const selectedNodeApplication = nodeParents
    .find((n) => n.properties.layer === OutSystemsDataLayers.APPLICATION.toString());
  // Selected Node's application does somehow not exist
  if (selectedNodeApplication === undefined) return null;

  const inSameApplication = (dep: cytoscape.NodeSingular) => {
    const dependencyApplication = getParents(dep.data(), nodes)
      .find((n) => n.properties.layer === OutSystemsDataLayers.APPLICATION.toString());
    if (!dependencyApplication) return false;
    return dependencyApplication.id === selectedNodeApplication.id;
  };

  const incomingDeps = node.incomers().filter((ele) => ele.isNode());
  const outgoingDeps = node.outgoers().filter((ele) => ele.isNode());

  const externalIncomingDeps = incomingDeps
    .filter((d: cytoscape.NodeSingular) => !inSameApplication(d)).length;
  const externalOutgoingDeps = outgoingDeps
    .filter((d: cytoscape.NodeSingular) => !inSameApplication(d)).length;

  if (externalIncomingDeps === 0 && externalOutgoingDeps === 0) return DependencyProfile.HIDDEN;
  if (externalIncomingDeps !== 0 && externalOutgoingDeps === 0) return DependencyProfile.OUTBOUND;
  if (externalIncomingDeps === 0 && externalOutgoingDeps !== 0) return DependencyProfile.INBOUND;
  return DependencyProfile.TRANSIT;
}

const dependencyProfileColor = {
  [DependencyProfile.HIDDEN]: '#ff0000',
  [DependencyProfile.INBOUND]: '#00ff00',
  [DependencyProfile.OUTBOUND]: '#0099ff',
  [DependencyProfile.TRANSIT]: '#ffff00',
};

/**
 * Dependency profile coloring object required for the coloring function of the graph
 */
export function useDependencyProfileColoring() {
  const { shadeColorByDepth } = useColorShading();
  const { currentNodeId } = useContext(VisualizationHistory);

  const coloring = useMemo(() => ({
    name: 'Dependency Profile',
    type: 'category',
    colorFunction: (node: cytoscape.NodeSingular) => {
      const dependencyProfile = getDependencyProfile(node, currentNodeId);
      if (dependencyProfile == null) return shadeColorByDepth(node, DEFAULT_NODE_COLOR);

      return dependencyProfileColor[dependencyProfile];
      // const [firstColor, secondColor, ...restColors] = ColoringModeColors
      //   .get(GraphColoringMode.DEPENDENCY_PROFILE) || [];
      // const hexColor = getRatioColor(
      //   dependencyProfileValue / 4,
      //   firstColor,
      //   secondColor,
      //   ...restColors,
      // );
      // if (dependencyProfile === null) {
      //   const depth = Number(node.data('properties.depth'));
      //   const alpha = (4 - depth) * 0.15;
      //   return shadeHexColor(hexColor, alpha);
      // }
      // return hexColor;
    },
    legend: new Map([
      [dependencyProfileColor[DependencyProfile.HIDDEN], 'Hidden dependency'],
      [dependencyProfileColor[DependencyProfile.INBOUND], 'Inbound dependency'],
      [dependencyProfileColor[DependencyProfile.OUTBOUND], 'Outbound dependency'],
      [dependencyProfileColor[DependencyProfile.TRANSIT], 'Transit dependency'],
    ]),
  }), [currentNodeId, shadeColorByDepth]);

  return { coloring };
}
