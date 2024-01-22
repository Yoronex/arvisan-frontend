import { useContext } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { convertRemToPixels } from '../../helpers/viewport';
import VisualizationStyle from './VisualizationStyle';
import './Visualization.scss';
import { VisualizationContext } from '../../context/VisualizationContext';
import cytoscape from 'cytoscape';

interface Props {
  sidebarWidth: string | number;
}

export default function Visualization({ sidebarWidth: rawSidebarWidth }: Props) {
  const { graph } = useContext(VisualizationContext);
  const { nodes, edges } = graph;

  let sidebarWidth: number;
  if (typeof rawSidebarWidth === 'string') {
    sidebarWidth = convertRemToPixels(parseFloat(rawSidebarWidth));
  } else {
    sidebarWidth = rawSidebarWidth;
  }

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const cytoscapeNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      label: node.data.properties.simpleName,
      name: node.data.properties.simpleName,
    },
  }));
  const cytoscapeEdges = edges.map((edge) => ({
    ...edge,
    data: {
      ...edge.data,
      interaction: edge.data.label,
    },
  }));

  const elements: (cytoscape.ElementDefinition)[] = [...cytoscapeNodes, ...cytoscapeEdges];
  console.log(elements);

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: '100%', height: '100%' }}
      pan={{ x: sidebarWidth + (vw - sidebarWidth) / 2, y: vh / 2 }}
      // stylesheet={VisualizationStyle}
      className="cy"
    />
  );
}
