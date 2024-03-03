import ColoringModeDropdown from './ColoringModeDropdown';
import ColoringModeGradient from './ColoringModeGradient';

export default function ColoringMode() {
  return (
    <div>
      <h4>Coloring mode</h4>
      <div className="d-flex flex-column gap-2">
        <ColoringModeDropdown />
        <ColoringModeGradient />
      </div>
    </div>
  );
}
