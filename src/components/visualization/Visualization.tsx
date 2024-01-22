import CytoscapeComponent from 'react-cytoscapejs';
import { convertRemToPixels } from '../../helpers/viewport';
import VisualizationStyle from './VisualizationStyle';
import './Visualization.scss';

interface Props {
  sidebarWidth: string | number;
}

export default function Visualization({ sidebarWidth: rawSidebarWidth }: Props) {
  let sidebarWidth: number;
  if (typeof rawSidebarWidth === 'string') {
    sidebarWidth = convertRemToPixels(parseFloat(rawSidebarWidth));
  } else {
    sidebarWidth = rawSidebarWidth;
  }

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
  ];

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
