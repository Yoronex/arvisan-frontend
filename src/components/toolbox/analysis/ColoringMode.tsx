import { useContext } from 'react';
import ColoringModeDropdown from './ColoringModeDropdown';
import ColoringModeGradient from './ColoringModeGradient';
import { ColoringContext } from '../../../context';
import ColoringModeCategories from './ColoringModeCategories';

export default function ColoringMode() {
  const { currentMode } = useContext(ColoringContext);
  return (
    <div>
      <h4>Coloring mode</h4>
      <div className="d-flex flex-column gap-2">
        <ColoringModeDropdown />
        {currentMode !== undefined && currentMode.type === 'ratio' && (<ColoringModeGradient />)}
        {currentMode !== undefined && currentMode.type === 'category' && (<ColoringModeCategories coloring={currentMode} />)}
      </div>
    </div>
  );
}
