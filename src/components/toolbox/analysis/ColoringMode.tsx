import { useContext } from 'react';
import MetricModeDropdown from './MetricModeDropdown';
import ColoringModeGradient from './ColoringModeGradient';
import { ColoringContext } from '../../../context';
import ColoringModeCategories from './ColoringModeCategories';

export default function ColoringMode() {
  const { setMode, options, currentMode } = useContext(ColoringContext);
  return (
    <div>
      <h4>Coloring mode</h4>
      <div className="d-flex flex-column gap-2">
        <MetricModeDropdown title="Choose coloring mode" setMode={setMode} options={options} currentMode={currentMode} />
        {currentMode !== undefined && currentMode.type === 'ratio' && (<ColoringModeGradient />)}
        {currentMode !== undefined && currentMode.type === 'category' && (<ColoringModeCategories coloring={currentMode} />)}
      </div>
    </div>
  );
}
