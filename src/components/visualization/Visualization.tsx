import {
  useContext, useEffect, useRef,
} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import klay from 'cytoscape-klay';
import cola from 'cytoscape-cola';
import './Visualization.scss';
import { VisualizationContext } from '../../context/VisualizationContext';
import VisualizationStyle from './VisualizationStyle';
import { assignEdgeWeights, colorNodes } from '../../cytoscape/operations';
import { VisualizationLayoutContext } from '../../context/VisualizationLayoutContext';

cytoscape.use(klay);
cytoscape.use(cola);

interface Props {
  center: { x: number, y: number };
}

export default function Visualization({ center }: Props) {
  const { graph, selectNode } = useContext(VisualizationContext);
  const { nodes, edges } = graph;
  const { layoutOptions, reloadedAt } = useContext(VisualizationLayoutContext);
  const cy = useRef<cytoscape.Core>();

  const elements: (cytoscape.ElementDefinition)[] = [...nodes, ...edges];

  /**
   * For all nodes with a "contains" relationship, make sure the target node is
   * contained in the source node and hide the edge.
   */
  const createNestedNodes = () => {
    if (!cy.current) return;

    cy.current.edges('#parentRel').removeClass('parentRel');
    cy.current.edges('[interaction="contains"]').forEach((e) => {
      e.target().move({ parent: e.source().id() });
    });
    cy.current.edges('[interaction = "contains"]').addClass('parentRel');
  };

  /** Graph operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.layout(layoutOptions).run();
  }, [cy, graph, layoutOptions, reloadedAt]);

  /** Node operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.nodes().forEach(colorNodes);

    // Add event listener to select a node once it has been clicked
    cy.current.on('tap', 'node', (event) => {
      const node = event.target as cytoscape.NodeSingular;
      selectNode(node);
    });
  }, [cy, nodes, selectNode]);

  /** Edge operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.edges().forEach(assignEdgeWeights);

    createNestedNodes();
  }, [cy, edges]);

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: '100%', height: '100%' }}
      pan={center}
      stylesheet={VisualizationStyle}
      className="cy"
      cy={(c) => {
        cy.current = c;
      }}
    />
  );
}
