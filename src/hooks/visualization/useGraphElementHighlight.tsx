import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { GraphContext, GraphHighlightContext } from '../../context';

export default function useGraphElementHighlight(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);
  const {
    nodes: highlightedNodes, edges: highlightedEdges, finish: finishHighlight,
  } = useContext(GraphHighlightContext);

  return useEffect(() => {
    if (!cy.current) return;

    if (highlightedNodes) {
      const ids = [highlightedNodes[0]].map((n) => `[id = '${n.id}']`).join(', ');
      const nodes = cy.current.nodes(`${ids}`);
      cy.current.animate({
        fit: {
          eles: nodes,
          padding: Math.round(Math.min(window.innerHeight / 2.5, window.innerWidth / 2.5)),
        },
      });
    } else if (highlightedEdges) {
      const actualEdges = highlightedEdges
        .map((h) => graph.edges
          .find((e) => e.data.id.includes(h.id)))
        .filter((e) => e !== undefined)
        .map((e) => e!);
      const ids = actualEdges.map((e) => `[id = '${e.data.id}']`).join(', ');
      const edges = cy.current.edges(`${ids}`);
      cy.current.animate({
        fit: {
          eles: edges,
          padding: Math.round(Math.min(window.innerHeight / 5, window.innerWidth / 5)),
        },
      });
    }
    finishHighlight();
  }, [cy, finishHighlight, graph.edges, highlightedEdges, highlightedNodes]);
}
