import GraphInternalExternalRelationshipsSettings from './settings/GraphInternalExternalRelationshipsSettings';
import GraphDependantsAndDependenciesSettings from './settings/GraphDependantsAndDependenciesSettings';
import GraphDepthAndLengthSettings from './settings/GraphDepthAndLengthSettings';
import GraphLayoutAlgorithm from './settings/GraphLayoutAlgorithm';

export default function VisualizationSettings() {
  return (
    <>
      <GraphDepthAndLengthSettings />
      <hr />
      <GraphDependantsAndDependenciesSettings />
      <hr />
      <GraphInternalExternalRelationshipsSettings />
      <hr />
      <GraphLayoutAlgorithm />
    </>
  );
}
