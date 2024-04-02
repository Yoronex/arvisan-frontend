import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import {
  DEFAULT_NODE_COLOR, DEFAULT_NODE_COLOR_RATIO, getRatioColor,
} from '../../helpers/color';
import useColorShading from '../useColorShading';
import { NodeData } from '../../api';
import { IRatioMetric } from '../../helpers/metrics';

export const cohesionColors = DEFAULT_NODE_COLOR_RATIO;

export default function useCohesionMetrics(): { coloring: IRatioMetric } {
  const { shadeColorByDepth } = useColorShading();

  const getCohesion = (node: cytoscape.NodeSingular) => node.data('properties.cohesion') as NodeData['properties']['cohesion'];

  const coloring: IRatioMetric = useMemo(() => ({
    name: 'Cohesion',
    nodeDetailsTitle: 'Cohesion',
    nodeDetailsValue(node: cytoscape.NodeSingular) {
      const cohesion = getCohesion(node);
      if (cohesion == null) return null;
      return cohesion;
    },
    type: 'ratio',
    colors: cohesionColors,
    rangeFunction(nodes: cytoscape.NodeCollection) {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node: cytoscape.NodeSingular) => {
        const value = getCohesion(node);
        if (value == null) return;
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction(node: cytoscape.NodeSingular, range) {
      const cohesion = getCohesion(node);
      if (cohesion == null) {
        return shadeColorByDepth(node, DEFAULT_NODE_COLOR);
      }

      const [firstColor, secondColor, ...restColors] = cohesionColors;
      return getRatioColor(cohesion / range[1], firstColor, secondColor, ...restColors);
    },
  }), [shadeColorByDepth]);

  return { coloring };
}
