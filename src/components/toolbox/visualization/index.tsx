import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import GraphInternalExternalRelationshipsSettings from './GraphInternalExternalRelationshipsSettings';
import GraphDependencySettings from './GraphDependencySettings';
import GraphDepthAndLengthSettings from './GraphDepthAndLengthSettings';
import GraphLayoutAlgorithm from './GraphLayoutAlgorithm';
import DependencyTypes from './DependencyTypes';
import { GraphSettingsContext, ViolationsContext } from '../../../context';

export default function ToolboxVisualization() {
  const { resetSettings } = useContext(GraphSettingsContext);
  const { resetVisibility } = useContext(ViolationsContext);

  const reset = () => {
    resetSettings();
    resetVisibility();
  };

  return (
    <>
      <Button size="sm" className="w-100" onClick={reset}>
        Reset to defaults
      </Button>
      <hr />
      <GraphDepthAndLengthSettings />
      <hr />
      <GraphDependencySettings />
      <hr />
      <GraphInternalExternalRelationshipsSettings />
      <hr />
      <GraphLayoutAlgorithm />
      <hr />
      <DependencyTypes />
    </>
  );
}
