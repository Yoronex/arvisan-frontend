import cytoscape from 'cytoscape';
import { MutableRefObject, useContext, useEffect } from 'react';
import { ColoringContext, GraphContext } from '../../../context';
import { DEFAULT_NODE_COLOR } from '../../../helpers/color';

export default function useGraphColoring(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);
  const {
    mode, setRange, options, shadeColorByDepth,
  } = useContext(ColoringContext);

  return useEffect(() => {
    if (!cy.current) return;
    const coloringModeSettings = options.get(mode);
    const nodes = cy.current.nodes();

    if (coloringModeSettings?.type === 'ratio') {
      const range = coloringModeSettings.rangeFunction
        ? coloringModeSettings.rangeFunction(nodes)
        : undefined;
      nodes.forEach((n) => {
        const color = coloringModeSettings.colorFunction(n, range ?? [0, 1]);
        n.style('background-color', color);
      });
      setRange(range);
    } else if (coloringModeSettings?.type === 'category') {
      nodes.forEach((n) => {
        const color = coloringModeSettings.colorFunction(n);
        n.style('background-color', color);
      });
    } else {
      nodes.forEach((n) => {
        const color = shadeColorByDepth(n, DEFAULT_NODE_COLOR);
        n.style('background-color', color);
      });
    }
  }, [cy, graph, mode, options, setRange, shadeColorByDepth]);
}
