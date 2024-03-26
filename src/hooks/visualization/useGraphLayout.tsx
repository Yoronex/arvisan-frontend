import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { GraphContext, VisualizationLayoutContext } from '../../context';
import { PossibleLayoutOptions } from '../../context/VisualizationLayoutContext';

export default function useGraphLayout(cy: MutableRefObject<cytoscape.Core | undefined>) {
  const { layoutOptions, reloadedAt } = useContext(VisualizationLayoutContext);
  const { graph } = useContext(GraphContext);

  return useEffect(() => {
    if (!cy.current) return;
    cy.current.layout({
      ...layoutOptions,
      fit: true,
    } as PossibleLayoutOptions).run();
  }, [cy, graph, layoutOptions, reloadedAt]);
}
