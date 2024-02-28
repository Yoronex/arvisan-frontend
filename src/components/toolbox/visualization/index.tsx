import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import GraphInternalExternalRelationshipsSettings from './GraphInternalExternalRelationshipsSettings';
import GraphDependencySettings from './GraphDependencySettings';
import GraphDepthAndLengthSettings from './GraphDepthAndLengthSettings';
import GraphLayoutAlgorithm from './GraphLayoutAlgorithm';
import DependencyTypes from './DependencyTypes';
import { GraphContext } from '../../../context';

export default function ToolboxVisualization() {
  const { resetSettings } = useContext(GraphContext);
  return (
    <>
      <Button size="sm" className="w-100" onClick={resetSettings}>
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
