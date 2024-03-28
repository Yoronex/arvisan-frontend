import {
  useContext, useRef, useState,
} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import klay from 'cytoscape-klay';
import cola from 'cytoscape-cola';
import './Visualization.scss';
import { GraphContext } from '../../context';
import VisualizationStyle from './VisualizationStyle';
import { HoverDetailsCard } from './hover';
import GraphElementDetailsModal from './clickModal/GraphElementDetailsModal';
import {
  useGraphColoring, useGraphElementHighlight,
  useGraphLayout, useGraphNodeSizing, useGraphPostProcessing,
  useGraphViolations,
  useOperationsClick,
  useOperationsHover,
} from '../../hooks/visualization';

cytoscape.use(klay);
cytoscape.use(cola);

interface Props {
  center: { x: number, y: number };
}

export default function Visualization({
  center,
}: Props) {
  const { graph, enableMovingNodes } = useContext(GraphContext);

  const [hoveredElement, setHoveredElement] = useState<cytoscape.Singular | null>(null);
  const [selectedElement, setSelectedElement] = useState<cytoscape.Singular | null>(null);

  const cy = useRef<cytoscape.Core>();

  useGraphNodeSizing(cy);
  useOperationsClick(cy, setSelectedElement, setHoveredElement);
  useOperationsHover(cy, setHoveredElement);
  useGraphColoring(cy);
  useGraphViolations(cy);
  useGraphElementHighlight(cy);
  useGraphPostProcessing(cy);
  useGraphLayout(cy);

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
      <HoverDetailsCard element={hoveredElement} />
      <GraphElementDetailsModal
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
      />
    </>
  );
}
