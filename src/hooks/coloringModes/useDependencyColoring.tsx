import cytoscape from 'cytoscape';
import { useMemo } from 'react';
import { DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring } from '../../helpers/color';
import useColorShading from '../useColorShading';
import {
  getIncomingOutgoingDifference,
  getNrIncomingFunctionDeps,
  getNrOutgoingFunctionDeps,
} from '../../helpers/metrics';

export const dependencyColors = DEFAULT_NODE_COLOR_RATIO;

export default function useDependencyColoring(): { colorings: IRatioColoring[] } {
  const { shadeColorByDepth } = useColorShading();

  const colors = dependencyColors;
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
        return shadeColorByDepth(node, '#7B7D7D');
      }

      const [min, max] = range2;
      const logMin = log10(min);
      const logMax = log10(max);
      const incomingDeps = log10(getValueFunction(node));
      const [firstColor, secondColor, ...restColors] = colors;

      return getRatioColor(
        (incomingDeps - logMin) / (logMax - logMin),
        firstColor,
        secondColor,
        ...restColors,
      );
    };

    return [{
      name: 'Incoming dependencies (log scale)',
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrIncomingFunctionDeps),
      colorFunction: getColorFunction(getNrIncomingFunctionDeps),
    }, {
      name: 'Outgoing dependencies (log scale)',
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getNrOutgoingFunctionDeps),
      colorFunction: getColorFunction(getNrOutgoingFunctionDeps),
    }, {
      name: 'Dependency difference (log scale)',
      type: 'ratio',
      colors,
      rangeFunction: getRangeFunction(getIncomingOutgoingDifference),
      colorFunction: getColorFunction(getIncomingOutgoingDifference),
    }];
  }, [colors, shadeColorByDepth]);

  return { colorings };
}
