import {
  MutableRefObject, useCallback, useContext, useEffect,
} from 'react';
import cytoscape from 'cytoscape';
import { GraphContext } from '../../../context';

export default function useOperationsHover(
  cy: MutableRefObject<cytoscape.Core | undefined>,
  setHoveredElement: (element: cytoscape.Singular | null) => void,
) {
  const { graph, enableHoverDetails } = useContext(GraphContext);

  const handleHoverElement = useCallback((event: cytoscape.EventObject) => {
    const element = event.target as cytoscape.Singular;
    setHoveredElement(element);
  }, [setHoveredElement]);

  // Show hover details
  useEffect(() => {
    if (!cy.current) return;

    // Add event listener to open a hover card once an element is hovered
    if (!enableHoverDetails) {
      cy.current.elements().removeListener('mouseover', undefined, handleHoverElement);
    } else {
      cy.current.elements().on('mouseover', handleHoverElement);
    }
  }, [cy, graph, enableHoverDetails, handleHoverElement]);

  // Always hide hover details
  useEffect(() => {
    if (!cy.current) return;

    cy.current.elements().on('mouseout', () => {
      setHoveredElement(null);
    });
  }, [cy, enableHoverDetails, graph, setHoveredElement]);
}
