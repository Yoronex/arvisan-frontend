import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { assignEdgeWeights } from '../../../cytoscape/operations';
import { GraphContext } from '../../../context';

export default function useGraphPostProcessing(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);

  return useEffect(() => {
    if (!cy.current) return;
    cy.current.edges().forEach(assignEdgeWeights);
  }, [cy, graph]);
}
