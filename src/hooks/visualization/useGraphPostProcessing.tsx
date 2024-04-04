import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { GraphContext } from '../../context';
import { EdgeData } from '../../api';

export default function useGraphPostProcessing(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { graph } = useContext(GraphContext);

  return useEffect(() => {
    if (!cy.current) return;
    cy.current.edges().forEach((e) => {
      const nrFunctionDependencies = e.data('properties.nrFunctionDependencies') as EdgeData['properties']['nrFunctionDependencies'];
      if (!nrFunctionDependencies) return;
      e.style('width', Math.sqrt(nrFunctionDependencies));
    });
  }, [cy, graph]);
}
