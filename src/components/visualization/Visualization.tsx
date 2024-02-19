import {
  useContext, useEffect, useRef, useState,
} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import klay from 'cytoscape-klay';
import cola from 'cytoscape-cola';
import './Visualization.scss';
import {
  GraphContext, VisualizationHistory, NodeHighlightContext, ViolationsContext,
} from '../../context';
import VisualizationStyle from './VisualizationStyle';
import { assignEdgeWeights, colorNodes } from '../../cytoscape/operations';
import { PossibleLayoutOptions, VisualizationLayoutContext } from '../../context/VisualizationLayoutContext';
import HoverDetailsCard from './HoverDetailsCard';

cytoscape.use(klay);
cytoscape.use(cola);

interface Props {
  center: { x: number, y: number };
}

export default function Visualization({
  center,
}: Props) {
  const { graph, enableMovingNodes } = useContext(GraphContext);
  const { visitNode } = useContext(VisualizationHistory);
  const { node: highlightedNode, finish: finishHighlightNode } = useContext(NodeHighlightContext);
  const { layoutOptions, reloadedAt } = useContext(VisualizationLayoutContext);
  const { violations } = useContext(ViolationsContext);

  const [hoveredNode, setHoveredNode] = useState<cytoscape.NodeSingular | null>(null);

  const cy = useRef<cytoscape.Core>();

  /** Graph operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.layout({
      ...layoutOptions,
      fit: true,
    } as PossibleLayoutOptions).run();
  }, [cy, graph, layoutOptions, reloadedAt]);

  /** Node operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.nodes().forEach(colorNodes);

    // Add event listener to select a node once it has been clicked
    cy.current.on('tap', 'node', (event) => {
      const node = event.target as cytoscape.NodeSingular;
      visitNode({
        type: 'cytoscape',
        data: node,
        timestamp: new Date(),
      });
    });
    cy.current.on('mouseover', 'node', (event) => {
      const node = event.target as cytoscape.NodeSingular;
      setHoveredNode(node);
    });
    cy.current.on('mouseout', 'node', () => {
      setHoveredNode(null);
    });
  }, [cy, graph, visitNode]);

  /** Edge operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.edges().forEach(assignEdgeWeights);
  }, [cy, graph]);

  /** Violations */
  useEffect(() => {
    if (!cy.current) return;
    const ids = violations.dependencyCycles.map((c) => c.path.map((p) => p.id)).flat();
    console.log(ids.sort());
    cy.current.edges().forEach((e: cytoscape.EdgeSingular) => {
      e.removeClass('violation');

      const idWithRandom = e.id();
      const id = idWithRandom.split('--')[0] || '';

      console.log(id);

      if (ids.includes(id)) {
        console.log('match!');
        e.addClass('violation');
      }
    });
  }, [cy, violations]);

  /** Highlight node */
  useEffect(() => {
    if (!cy.current) return;
    if (!highlightedNode) return;
    const nodes = cy.current.nodes(`[id = '${highlightedNode.id}']`);
    cy.current.animate({
      fit: {
        eles: nodes,
        padding: Math.round(Math.min(window.innerHeight / 2.5, window.innerWidth / 2.5)),
      },
    });
    finishHighlightNode();
  }, [cy, finishHighlightNode, highlightedNode]);

  return (
    <>
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(graph)}
        style={{ width: '100%', height: '100%' }}
        pan={center}
        stylesheet={VisualizationStyle}
        className="cy"
        cy={(c) => {
          cy.current = c;
        }}
        wheelSensitivity={0.1}
        autoungrabify={!enableMovingNodes}
        boxSelectionEnabled
        userPanningEnabled
      />
      <HoverDetailsCard node={hoveredNode} />
    </>
  );
}
