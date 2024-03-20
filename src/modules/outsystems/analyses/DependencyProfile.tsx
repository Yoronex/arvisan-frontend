import cytoscape from 'cytoscape';
import { useMemo } from 'react';
import { DependencyProfile } from '../helpers/enums';
import useColorShading from '../../../hooks/useColorShading';
import { DEFAULT_NODE_COLOR, ICategoryColoring } from '../../../helpers/color';

/**
 * Given a node, get its dependency profile categorization. This function cannot be generalized for
 * any layered-like architecture, because the Dependency Profile is based on the Application-layer
 * as its upper layer. We cannot use the (sub)layer-layers, because by architecture standards these
 * (sub)layers are only categorizations of module types, but have no true architectural value.
 *
 * @param node
 * @returns DependencyProfile
 * @returns null if node not on the "Module" layer
 */
export default function getDependencyProfileCategory(
  node: cytoscape.NodeSingular,
): DependencyProfile | null {
  return node.data('properties.dependencyProfileCategory') ?? null;
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

  const coloring: ICategoryColoring = useMemo(() => ({
    name: 'Dependency profile',
    type: 'category',
    colorFunction: (node: cytoscape.NodeSingular) => {
      const dependencyProfile = getDependencyProfileCategory(node);
      if (dependencyProfile == null) return shadeColorByDepth(node, DEFAULT_NODE_COLOR);
      return dependencyProfileColor[dependencyProfile];
    },
    legend: new Map([
      [dependencyProfileColor[DependencyProfile.HIDDEN], 'Hidden dependency'],
      [dependencyProfileColor[DependencyProfile.INBOUND], 'Inbound dependency'],
      [dependencyProfileColor[DependencyProfile.OUTBOUND], 'Outbound dependency'],
      [dependencyProfileColor[DependencyProfile.TRANSIT], 'Transit dependency'],
    ]),
  }), [shadeColorByDepth]);

  return { coloring };
}
