import {
  useContext, useEffect, useRef,
} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import './Visualization.scss';
import { VisualizationContext } from '../../context/VisualizationContext';
import VisualizationStyle from './VisualizationStyle';
import { assignEdgeWeights, colorNodes } from '../../cytoscape/operations';

interface Props {
  center: { x: number, y: number };
}

export default function Visualization({ center }: Props) {
  const { graph } = useContext(VisualizationContext);
  const { nodes, edges } = graph;
  const cy = useRef<cytoscape.Core>();

  const elements: (cytoscape.ElementDefinition)[] = [...nodes, ...edges];

  /** Graph operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.layout({ name: 'grid' }).run();
  }, [cy, graph]);

  /** Node operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.nodes().forEach(colorNodes);
  }, [cy, nodes]);

  /** Edge operations */
  useEffect(() => {
    if (!cy.current) return;
    cy.current.edges().forEach(assignEdgeWeights);
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
