import GraphInternalExternalRelationshipsSettings from './settings/GraphInternalExternalRelationshipsSettings';
import GraphDependencySettings from './settings/GraphDependencySettings';
import GraphDepthAndLengthSettings from './settings/GraphDepthAndLengthSettings';
import GraphLayoutAlgorithm from './settings/GraphLayoutAlgorithm';

export default function VisualizationSettings() {
  return (
    <>
      <GraphDepthAndLengthSettings />
      <hr />
      <GraphDependencySettings />
      <hr />
      <GraphInternalExternalRelationshipsSettings />
      <hr />
      <GraphLayoutAlgorithm />
    </>
  );
}
