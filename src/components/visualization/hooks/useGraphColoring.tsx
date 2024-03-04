import cytoscape from 'cytoscape';
import { MutableRefObject, useContext, useEffect } from 'react';
import { ColoringModeOptions } from '../../../helpers/color';
import { ColoringContext } from '../../../context/ColoringContext';
import { GraphContext } from '../../../context';

export default function useGraphColoring(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);
  const { mode, setRange } = useContext(ColoringContext);

  return useEffect(() => {
    if (!cy.current) return;
    const coloringModeSettings = ColoringModeOptions.get(mode)!;
    const nodes = cy.current.nodes();
    const range = coloringModeSettings.rangeFunction
      ? coloringModeSettings.rangeFunction(nodes)
      : undefined;
    nodes.forEach((n) => {
      const color = coloringModeSettings.colorFunction(n, range ?? [0, 1]);
      n.style('background-color', color);
    });
    setRange(range);
  }, [cy, graph, mode, setRange]);
}
