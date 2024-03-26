import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import {
  DEFAULT_NODE_COLOR, DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring,
} from '../../helpers/color';
import useColorShading from '../useColorShading';

export const cohesionColors = DEFAULT_NODE_COLOR_RATIO;

export default function useCohesionColoring(): { coloring: IRatioColoring } {
  const { shadeColorByDepth } = useColorShading();

  const coloring: IRatioColoring = useMemo(() => ({
    name: 'Cohesion',
    type: 'ratio',
    colors: cohesionColors,
    rangeFunction: (nodes: cytoscape.NodeCollection) => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = node.data('properties.cohesion');
        if (value == null) return;
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction: (node: cytoscape.NodeSingular, range) => {
      const cohesion = node.data('properties.cohesion');
      if (cohesion == null) {
        return shadeColorByDepth(node, DEFAULT_NODE_COLOR);
      }

      const [firstColor, secondColor, ...restColors] = cohesionColors;
      return getRatioColor(cohesion / range[1], firstColor, secondColor, ...restColors);
    },
  }), [shadeColorByDepth]);

  return { coloring };
}
