import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import { getNrIncomingFunctionDeps } from '../../cytoscape/operations';
import { DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring } from '../../helpers/color';

export const incomingDependenciesColors = DEFAULT_NODE_COLOR_RATIO;

export default function useIncomingDepsColoring() {
  const coloring: IRatioColoring = useMemo(() => ({
    name: 'Incoming dependencies',
    type: 'ratio',
    colors: incomingDependenciesColors,
    rangeFunction: (nodes: cytoscape.NodeCollection) => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = getNrIncomingFunctionDeps(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction: (node: cytoscape.NodeSingular, range2: [number, number]) => {
      const [min, max] = range2;
      const incomingDeps = getNrIncomingFunctionDeps(node);
      const [firstColor, secondColor, ...restColors] = incomingDependenciesColors;

      return getRatioColor(
        (incomingDeps - min) / (max - min),
        firstColor,
        secondColor,
        ...restColors,
      );
    },
  }), []);

  return { coloring };
}
