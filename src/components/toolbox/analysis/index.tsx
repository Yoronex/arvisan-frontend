import CyclicalDependencies from './CyclicalDependencies';
import SubLayerViolations from './SubLayerViolations';

export default function ToolboxAnalysis() {
  return (
    <div className="d-flex flex-column gap-3">
      <CyclicalDependencies />
      <SubLayerViolations />
    </div>
  );
}
