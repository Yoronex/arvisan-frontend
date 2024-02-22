import CyclicalDependencies from './CyclicalDependencies';
import SubLayerViolations from './SubLayerViolations';

export default function ToolboxAnalysis() {
  return (
    <>
      <CyclicalDependencies />
      <SubLayerViolations />
    </>
  );
}
