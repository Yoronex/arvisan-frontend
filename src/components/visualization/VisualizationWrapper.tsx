import { useContext } from 'react';
import { VisualizationContext } from '../../context/VisualizationContext';
import { convertRemToPixels } from '../../helpers/viewport';
import VisualizationLoading from './VisualizationLoading';
import Visualization from './Visualization';

interface Props {
  sidebarWidth: string | number;
}

export default function VisualizationWrapper({ sidebarWidth: rawSidebarWidth }: Props) {
  const { loading } = useContext(VisualizationContext);

  let sidebarWidth: number;
  if (typeof rawSidebarWidth === 'string') {
    sidebarWidth = convertRemToPixels(parseFloat(rawSidebarWidth));
  } else {
    sidebarWidth = rawSidebarWidth;
  }
  const menubarHeight: number = 100;

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const center = {
    x: sidebarWidth + (vw - sidebarWidth) / 2,
    y: menubarHeight + (vh - menubarHeight) / 2,
  };

  return (
    <div className="cy-wrapper w-100 h-100">
      {loading && <VisualizationLoading center={center} />}
      <Visualization center={center} />
    </div>
  );
}
