import cytoscape from 'cytoscape';
import { useMemo } from 'react';
import {
  DEFAULT_NODE_COLOR, DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring,
} from '../../helpers/color';
import useColorShading from '../useColorShading';
import {
  getFileSizeKB,
  getIncomingOutgoingDifference,
  getNrIncomingFunctionDeps,
  getNrOutgoingFunctionDeps,
} from '../../helpers/metrics';

export default function useSimpleLeafPropertyColoring(): { colorings: IRatioColoring[] } {
  const { shadeColorByDepth } = useColorShading();

  const colors = DEFAULT_NODE_COLOR_RATIO;
  const log10 = (val: number) => Math.log10(val + 1);

  const colorings: IRatioColoring[] = useMemo(() => {
    const getRangeFunction = (
      getValueFunction: (node: cytoscape.NodeSingular) => number,
    ) => (nodes: cytoscape.NodeCollection): [number, number] => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = getValueFunction(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    };

    const getColorFunction = (
      getValueFunction: (node: cytoscape.NodeSingular) => number,
    ) => (node: cytoscape.NodeSingular, range2: [number, number]) => {
      if (node.isParent()) {
        return shadeColorByDepth(node, DEFAULT_NODE_COLOR);
      }

      const [min, max] = range2;
      const logMax = log10(max - min);
      const value = log10(getValueFunction(node) - min);
      const [firstColor, secondColor, ...restColors] = colors;

      return getRatioColor(
        (value) / (logMax),
        firstColor,
        secondColor,
        ...restColors,
      );
    };

    return [{
      name: 'Incoming dependencies (log scale)',
      nodeDetailsTitle: 'Incoming dependencies',
      nodeDetailsValue() { return null; },
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrIncomingFunctionDeps),
      colorFunction: getColorFunction(getNrIncomingFunctionDeps),
    }, {
      name: 'Outgoing dependencies (log scale)',
      nodeDetailsTitle: 'Incoming dependencies',
      nodeDetailsValue() { return null; },
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrOutgoingFunctionDeps),
      colorFunction: getColorFunction(getNrOutgoingFunctionDeps),
    }, {
      name: 'Dependency difference (log scale)',
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
        const logMin = log10(-min);
        const logMax = log10(max);
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
    }, {
      name: 'File Size (KB log scale)',
      nodeDetailsTitle: 'File Size',
      nodeDetailsValue(node: cytoscape.NodeSingular) {
        const fileSize = getFileSizeKB(node);
        return `${fileSize} KB`;
      },
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getFileSizeKB),
      colorFunction: getColorFunction(getFileSizeKB),
    }];
  }, [colors, shadeColorByDepth]);

  return { colorings };
}
