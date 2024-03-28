import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { GraphContext, NodeSizingContext } from '../../context';

export default function useGraphNodeSizing(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);
  const { verticalSizingMode, horizontalSizingMode } = useContext(NodeSizingContext);

  return useEffect(() => {
    if (!cy.current
      || verticalSizingMode.sizeFunction == null
      || horizontalSizingMode.sizeFunction == null
    ) return;

    // Only leaves
    const nodes = cy.current.nodes().filter((n) => !n.isParent());

    const setDimension = (n: cytoscape.NodeSingular, dimension: 'height' | 'width', value: number | string) => {
      if (typeof value === 'string') {
        n.style(dimension, value);
      } else {
        n.style(dimension, value + 1);
      }
    };

    if (verticalSizingMode?.type === 'ratio') {
      const range = verticalSizingMode.rangeFunction
        ? verticalSizingMode.rangeFunction(nodes)
        : undefined;
      nodes.forEach((n) => {
        const height = verticalSizingMode.sizeFunction!(n, range ?? [0, 1]);
        console.log('height', height);
        setDimension(n, 'height', height);
      });
    } else if (verticalSizingMode?.type === 'category') {
      nodes.forEach((n) => {
        const height = verticalSizingMode.sizeFunction!(n);
        setDimension(n, 'height', height);
      });
    } else {
      nodes.forEach((n) => {
        setDimension(n, 'height', 'label');
      });
    }

    if (horizontalSizingMode?.type === 'ratio') {
      const range = horizontalSizingMode.rangeFunction
        ? horizontalSizingMode.rangeFunction(nodes)
        : undefined;
      nodes.forEach((n) => {
        const width = horizontalSizingMode.sizeFunction!(n, range ?? [0, 1]);
        console.log('width', width);
        setDimension(n, 'width', width);
      });
    } else if (horizontalSizingMode?.type === 'category') {
      nodes.forEach((n) => {
        const width = horizontalSizingMode.sizeFunction!(n);
        setDimension(n, 'width', width);
      });
    } else {
      nodes.forEach((n) => {
        setDimension(n, 'width', 'label');
      });
    }
  }, [cy, graph, horizontalSizingMode, verticalSizingMode]);
}
