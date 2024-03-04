import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { GraphContext } from '../../../context';

export default function useOperationsHover(
  cy: MutableRefObject<cytoscape.Core | undefined>,
  setHoveredElement: (element: cytoscape.Singular | null) => void,
) {
  const { graph } = useContext(GraphContext);

  return useEffect(() => {
    if (!cy.current) return;

    // Add event listener to open a hover card once an element is hovered
    cy.current.elements().on('mouseover', (event) => {
      const node = event.target as cytoscape.Singular;
      setHoveredElement(node);
    });
    cy.current.elements().on('mouseout', () => {
      setHoveredElement(null);
    });
  }, [cy, graph, setHoveredElement]);
}
