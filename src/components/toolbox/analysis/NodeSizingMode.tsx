import { useContext } from 'react';
import { NodeSizingContext } from '../../../context';
import MetricModeDropdown from './MetricModeDropdown';

export default function NodeSizingMode() {
  const {
    verticalSizingMode, setVerticalMode,
    horizontalSizingMode, setHorizontalMode,
    options,
  } = useContext(NodeSizingContext);

  return (
    <div>
      <h4>Node sizing modes</h4>
      <div className="d-flex flex-column gap-2">
        <h6>Node height</h6>
        <MetricModeDropdown title="Choose node height" setMode={setHorizontalMode} options={options} currentMode={horizontalSizingMode} />
        <h6>Node width</h6>
        <MetricModeDropdown title="Node width" setMode={setVerticalMode} options={options} currentMode={verticalSizingMode} />
      </div>
    </div>
  );
}
