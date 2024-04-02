import cytoscape from 'cytoscape';
import { useMemo } from 'react';
import { DEFAULT_NODE_COLOR, DEFAULT_NODE_COLOR_RATIO, getRatioColor } from '../../helpers/color';
import useColorShading from '../useColorShading';
import {
  getFileSizeKB,
  getIncomingOutgoingDifference, getNrEntities,
  getNrIncomingFunctionDeps,
  getNrOutgoingFunctionDeps,
  getNrScreens,
  IRatioMetric,
} from '../../helpers/metrics';
import { linearScale, logScale, sqrtScale } from './scales';

export default function useSimpleLeafPropertyMetrics(): { colorings: IRatioMetric[] } {
  const { shadeColorByDepth } = useColorShading();

  const colors = DEFAULT_NODE_COLOR_RATIO;

  const colorings: IRatioMetric[][] = useMemo((): IRatioMetric[][] => {
    const getRangeFunction = (
      getValueFunction: (node: cytoscape.NodeSingular) => number,
    ) => (nodes: cytoscape.NodeCollection): [number, number] => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        if (node.isParent()) return;
        const value = getValueFunction(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    };

    /**
     * Build a node color function
     * @param getValueFunction Function to get a metric value given a node
     * @param mapper Optionally map the node value function to a different value, e.g. log10 or sqrt
     */
    const getColorFunction = (
      getValueFunction: (node: cytoscape.NodeSingular) => number,
      mapper?: (v: number) => number,
    ) => (node: cytoscape.NodeSingular, range2: [number, number]) => {
      if (node.isParent()) {
        return shadeColorByDepth(node, DEFAULT_NODE_COLOR);
      }

      const [min, max] = range2;
      const logMax = mapper ? mapper(max - min) : max - min;
      const value = mapper ? mapper(getValueFunction(node) - min) : getValueFunction(node) - min;
      const [firstColor, secondColor, ...restColors] = colors;

      return getRatioColor(
        (value) / (logMax),
        firstColor,
        secondColor,
        ...restColors,
      );
    };

    /**
     * Build a node size function
     * @param getValueFunction Function to get a metric value given a node
     * @param mapper Optionally map the node value function to a different value, e.g. log10 or sqrt
     */
    const getSizeFunction = (
      getValueFunction: (node: cytoscape.NodeSingular) => number,
      mapper?: (v: number) => number,
    ) => (node: cytoscape.NodeSingular, range2: [number, number]) => {
      const [min, max] = range2;
      const logMax = mapper ? mapper(max - min) : max - min;
      const value = mapper ? mapper(getValueFunction(node) - min) : getValueFunction(node) - min;

      return (value / logMax) * 300;
    };

    return [[linearScale, sqrtScale, logScale].map((scale) => ({
      name: scale.name ? `Incoming dependencies (${scale.name} scale)` : 'Incoming dependencies',
      context: 'visualization',
      nodeDetailsTitle: 'Incoming dependencies',
      nodeDetailsValue() { return null; },
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrIncomingFunctionDeps),
      colorFunction: getColorFunction(getNrIncomingFunctionDeps, scale.mapper),
      sizeFunction: scale.name === 'sqrt' ? getSizeFunction(getNrIncomingFunctionDeps, scale.mapper) : undefined,
    })), [linearScale, sqrtScale, logScale].map((scale) => ({
      name: scale.name ? `Outgoing dependencies (${scale.name} scale)` : 'Outgoing dependencies',
      context: 'visualization',
      nodeDetailsTitle: 'Outgoing dependencies',
      nodeDetailsValue() { return null; },
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrOutgoingFunctionDeps),
      colorFunction: getColorFunction(getNrOutgoingFunctionDeps, scale.mapper),
      sizeFunction: scale.name === 'sqrt' ? getSizeFunction(getNrOutgoingFunctionDeps, scale.mapper) : undefined,
    })), [{
      name: 'Dependency difference (log scale)',
      context: 'visualization',
      nodeDetailsTitle: 'Dependency difference',
      nodeDetailsValue: getIncomingOutgoingDifference,
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getIncomingOutgoingDifference),
      colorFunction(node: cytoscape.NodeSingular, range: [number, number]) {
        const [min, max] = range;
        // No negative logarithm, so we can use the general color function
        if (min >= 0) return getColorFunction(getIncomingOutgoingDifference)(node, range);
        // Only negative logarithms, so inverse the difference function
        if (max <= 0) {
          return getColorFunction(
            (node2) => -getIncomingOutgoingDifference(node2),
          )(node, range);
        }

        // Ratio which has a difference of 0, i.e. the border value
        const borderRatio = (-min) / (max - min);
        const logMin = logScale.mapper ? logScale.mapper(-min) : -min;
        const logMax = logScale.mapper ? logScale.mapper(max) : max;
        const value = getIncomingOutgoingDifference(node);
        let ratio: number;
        if (value === 0) {
          ratio = borderRatio;
        } else if (value < 0) {
          ratio = (1 - (Math.log10(-value) / logMin)) * borderRatio;
        } else {
          ratio = (Math.log10(value) / logMax) * (1 - borderRatio) + borderRatio;
        }

        const [firstColor, secondColor, ...restColors] = colors;
        return getRatioColor(
          ratio,
          firstColor,
          secondColor,
          ...restColors,
        );
      },
    }], [linearScale, sqrtScale, logScale].map((scale) => ({
      name: scale.name ? `File Size (kB, ${scale.name} scale)` : 'File Size (kB)',
      context: 'graph',
      nodeDetailsTitle: 'File Size',
      nodeDetailsValue(node: cytoscape.NodeSingular) {
        const fileSize = getFileSizeKB(node);
        return `${fileSize.toLocaleString()} kB`;
      },
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getFileSizeKB),
      colorFunction: getColorFunction(getFileSizeKB, scale.mapper),
      sizeFunction: scale.name === 'sqrt' ? getSizeFunction(getFileSizeKB, scale.mapper) : undefined,
    })), [linearScale, sqrtScale, logScale].map((scale) => ({
      name: scale.name ? `Nr of screens (${scale.name} scale)` : 'Nr of screens',
      context: 'graph',
      nodeDetailsTitle: 'Number of screens',
      nodeDetailsValue: getNrScreens,
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrScreens),
      colorFunction: getColorFunction(getNrScreens, scale.mapper),
      sizeFunction: scale.name === 'sqrt' ? getSizeFunction(getNrScreens, scale.mapper) : undefined,
    })), [linearScale, sqrtScale, logScale].map((scale) => ({
      name: scale.name ? `Nr of entities (${scale.name} scale)` : 'Nr of entities',
      context: 'graph',
      nodeDetailsTitle: 'Number of entities',
      nodeDetailsValue: getNrEntities,
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrEntities),
      colorFunction: getColorFunction(getNrEntities, scale.mapper),
      sizeFunction: scale.name === 'sqrt' ? getSizeFunction(getNrEntities, scale.mapper) : undefined,
    }))];
  }, [colors, shadeColorByDepth]);

  return { colorings: colorings.flat() };
}
