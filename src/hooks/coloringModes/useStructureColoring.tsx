import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import useColorShading from '../useColorShading';
import { ICategoryColoring } from '../../helpers/color';

export default function useStructureColoring() {
  const { shadeColorByDepth } = useColorShading();

  const coloring: ICategoryColoring = useMemo(() => ({
    name: 'Structure',
    type: 'category',
    colorFunction: (node: cytoscape.NodeSingular) => {
      const hexColor = node.data('properties.color') as string;
      if (!hexColor) return '';
      return shadeColorByDepth(node, hexColor);
    },
    legend: new Map([]),
  }), [shadeColorByDepth]);

  return { coloring };
}
