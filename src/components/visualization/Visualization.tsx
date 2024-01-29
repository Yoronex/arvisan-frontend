import {
  useContext, useEffect, useRef, useState,
} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import klay from 'cytoscape-klay';
import cola from 'cytoscape-cola';
import './Visualization.scss';
import { VisualizationContext } from '../../context/VisualizationContext';
import VisualizationStyle from './VisualizationStyle';
import { assignEdgeWeights, colorNodes } from '../../cytoscape/operations';
import { PossibleLayoutOptions, VisualizationLayoutContext } from '../../context/VisualizationLayoutContext';
import HoverDetailsCard from './HoverDetailsCard';
import { VisualizationHistory } from '../../context/VisualizationHistory';
import { NodeData } from '../../api';

cytoscape.use(klay);
cytoscape.use(cola);

interface Props {
  center: { x: number, y: number };
}

export default function Visualization({
  center,
}: Props) {
  const { graph } = useContext(VisualizationContext);
  const { visitNode } = useContext(VisualizationHistory);
  const { layoutOptions, reloadedAt } = useContext(VisualizationLayoutContext);
  const [hoveredNode, setHoveredNode] = useState<cytoscape.NodeSingular | null>(null);

  const cy = useRef<cytoscape.Core>();

  const getDomain = (node: cytoscape.NodeSingular): NodeData => {
    if (node.isOrphan()) return node.data() as NodeData;
    const parent = node.parent();
    return getDomain(parent.first());
  };

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
      const nodeData = node.data() as NodeData;
      const domain = getDomain(node);
      visitNode(nodeData, domain);
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
      />
      <HoverDetailsCard node={hoveredNode} />
    </>
  );
}
