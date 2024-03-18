import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import { getNrIncomingFunctionDeps } from '../../cytoscape/operations';
import { DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring } from '../../helpers/color';

export const incomingDependenciesColors = DEFAULT_NODE_COLOR_RATIO;

export default function useIncomingDepsColoring() {
  const log10 = (val: number) => Math.log10(val + 1);

  const coloring: IRatioColoring = useMemo(() => ({
    name: 'Incoming dependencies (log scale)',
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
      const logMin = log10(min);
      const logMax = log10(max);
      const incomingDeps = log10(getNrIncomingFunctionDeps(node));
      const [firstColor, secondColor, ...restColors] = incomingDependenciesColors;

      return getRatioColor(
        (incomingDeps - logMin) / (logMax - logMin),
        firstColor,
        secondColor,
        ...restColors,
      );
    },
  }), []);

  return { coloring };
}
