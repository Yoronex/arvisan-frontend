import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { GraphContext, VisualizationHistory } from '../../../context';

export default function useOperationsClick(
  cy: MutableRefObject<cytoscape.Core | undefined>,
  setSelectedElement: (element: cytoscape.Singular) => void,
  setHoveredElement: (element: null) => void,
) {
  const { graph } = useContext(GraphContext);
  const { visitNode } = useContext(VisualizationHistory);

  return useEffect(() => {
    if (!cy.current) return;

    // Add event listener to select an element once it has been left-clicked
    cy.current.elements().on('tap', (event) => {
      const element = event.target as cytoscape.Singular;
      setSelectedElement(element);
      setHoveredElement(null);
    });

    // Add event listener to visit a node once it has been right-clicked
    cy.current.on('cxttap', 'node', (event) => {
      const node = event.target as cytoscape.NodeSingular;
      visitNode({
        type: 'cytoscape',
        data: node,
        timestamp: new Date(),
      });
    });
  }, [cy, graph, setHoveredElement, setSelectedElement, visitNode]);
}
