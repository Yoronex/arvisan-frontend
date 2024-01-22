import { useContext } from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import './Visualization.scss';
import { VisualizationContext } from '../../context/VisualizationContext';

interface Props {
  center: { x: number, y: number };
}

export default function Visualization({ center }: Props) {
  const { graph } = useContext(VisualizationContext);
  const { nodes, edges } = graph;

  const elements: (cytoscape.ElementDefinition)[] = [...nodes, ...edges];

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: '100%', height: '100%' }}
      pan={center}
      // stylesheet={VisualizationStyle}
      className="cy"
    />
  );
}
