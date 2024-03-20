import cytoscape from 'cytoscape';
import { useMemo } from 'react';
import { DependencyProfileCategory } from '../helpers/enums';
import useColorShading from '../../../hooks/useColorShading';
import { DEFAULT_NODE_COLOR, ICategoryColoring } from '../../../helpers/color';

export type DependencyProfile = [number, number, number, number];

/**
 * Given a node, get its dependency profile categorization. This function cannot be generalized for
 * any layered-like architecture, because the Dependency Profile is based on the Application-layer
 * as its upper layer. We cannot use the (sub)layer-layers, because by architecture standards these
 * (sub)layers are only categorizations of module types, but have no true architectural value.
 *
 * @param node
 * @returns DependencyProfileCategory
 * @returns null if node not on the "Module" layer
 */
export function getDependencyProfileCategory(
  node: cytoscape.NodeSingular,
): DependencyProfileCategory | null {
  return node.data('properties.dependencyProfileCategory') ?? null;
}

const dependencyProfileColor = {
  [DependencyProfileCategory.HIDDEN]: '#ff0000',
  [DependencyProfileCategory.INBOUND]: '#00ff00',
  [DependencyProfileCategory.OUTBOUND]: '#0099ff',
  [DependencyProfileCategory.TRANSIT]: '#ffff00',
};

/**
 * Get the dependency profile of the given node
 * @param node
 * @returns Quadruple of four categories [hidden, inbound, outbound, transit]
 * @return null if leaf node
 */
export function getDependencyProfile(
  node: cytoscape.NodeSingular,
): [number, number, number, number] {
  if (node.isChildless()) {
    switch (getDependencyProfileCategory(node)) {
      case DependencyProfileCategory.HIDDEN: return [1, 0, 0, 0];
      case DependencyProfileCategory.INBOUND: return [0, 1, 0, 0];
      case DependencyProfileCategory.OUTBOUND: return [0, 0, 1, 0];
      case DependencyProfileCategory.TRANSIT: return [0, 0, 0, 1];
      default: return [0, 0, 0, 0];
    }
  }

  return node.children().reduce((totalProfile: DependencyProfile, child) => {
    const childProfile: DependencyProfile = getDependencyProfile(child);
    return totalProfile.map((a, i) => a + childProfile[i]) as DependencyProfile;
  }, [0, 0, 0, 0]);
}

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
      [dependencyProfileColor[DependencyProfileCategory.HIDDEN], 'Hidden dependency'],
      [dependencyProfileColor[DependencyProfileCategory.INBOUND], 'Inbound dependency'],
      [dependencyProfileColor[DependencyProfileCategory.OUTBOUND], 'Outbound dependency'],
      [dependencyProfileColor[DependencyProfileCategory.TRANSIT], 'Transit dependency'],
    ]),
  }), [shadeColorByDepth]);

  return { coloring };
}
