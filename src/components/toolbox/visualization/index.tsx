import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import GraphInternalExternalRelationshipsSettings from './GraphInternalExternalRelationshipsSettings';
import GraphDependencySettings from './GraphDependencySettings';
import GraphDepthAndLengthSettings from './GraphDepthAndLengthSettings';
import GraphLayoutAlgorithm from './GraphLayoutAlgorithm';
import DependencyTypes from './DependencyTypes';
import {
  ColoringContext, GraphSettingsContext, NodeSizingContext, ViolationsContext,
} from '../../../context';

export default function ToolboxVisualization() {
  const { resetSettings } = useContext(GraphSettingsContext);
  const { resetVisibility } = useContext(ViolationsContext);
  const { resetColoring } = useContext(ColoringContext);
  const { resetNodeSizing } = useContext(NodeSizingContext);

  const reset = () => {
    resetSettings();
    resetVisibility();
    resetColoring();
    resetNodeSizing();
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
