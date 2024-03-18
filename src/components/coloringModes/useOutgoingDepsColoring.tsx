import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import { getNrOutgoingFunctionDeps } from '../../cytoscape/operations';
import { DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring } from '../../helpers/color';

export const outgoingDependenciesColors = DEFAULT_NODE_COLOR_RATIO;

export default function useOutgoingDepsColoring() {
  const coloring: IRatioColoring = useMemo(() => ({
    name: 'Outgoing dependencies',
    type: 'ratio',
    colors: outgoingDependenciesColors,
    rangeFunction: (nodes: cytoscape.NodeCollection) => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = getNrOutgoingFunctionDeps(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction: (node: cytoscape.NodeSingular, range2: [number, number]) => {
      const [min, max] = range2;
      const incomingDeps = getNrOutgoingFunctionDeps(node);
      const [firstColor, secondColor, ...restColors] = outgoingDependenciesColors;
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
