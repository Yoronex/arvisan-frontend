import cytoscape from 'cytoscape';
import { MutableRefObject, useContext, useEffect } from 'react';
import { ColoringContext, GraphContext } from '../../context';
import { DEFAULT_NODE_COLOR } from '../../helpers/color';
import useColorShading from '../useColorShading';

export default function useGraphColoring(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);
  const {
    currentMode, setRange,
  } = useContext(ColoringContext);
  const { shadeColorByDepth } = useColorShading();

  return useEffect(() => {
    if (!cy.current || !currentMode || currentMode.colorFunction == null) return;
    const nodes = cy.current.nodes();

    if (currentMode?.type === 'ratio') {
      const range = currentMode.rangeFunction
        ? currentMode.rangeFunction(nodes)
        : undefined;
      nodes.forEach((n) => {
        const color = currentMode.colorFunction!(n, range ?? [0, 1]);
        n.style('background-color', color);
      });
      setRange(range);
    } else if (currentMode?.type === 'category') {
      nodes.forEach((n) => {
        const color = currentMode.colorFunction!(n);
        n.style('background-color', color);
      });
    } else {
      nodes.forEach((n) => {
        const color = shadeColorByDepth(n, DEFAULT_NODE_COLOR);
        n.style('background-color', color);
      });
    }
  }, [cy, graph, currentMode, setRange, shadeColorByDepth]);
}
