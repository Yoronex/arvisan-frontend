import {
  Card, CardBody, CardHeader, CardTitle,
} from 'react-bootstrap';
import GraphInternalExternalRelationshipsSettings from './settings/GraphInternalExternalRelationshipsSettings';
import GraphDependantsAndDependenciesSettings from './settings/GraphDependantsAndDependenciesSettings';
import GraphDepthAndLengthSettings from './settings/GraphDepthAndLengthSettings';

interface Props {
  cardWidth: string | number;
}

export default function VisualizationSettings({ cardWidth }: Props) {
  return (
    <div className="position-absolute vh-100 px-3 pb-3 z-2" style={{ paddingTop: '6rem' }}>
      <Card className="h-100 shadow" style={{ width: cardWidth }}>
        <CardHeader>
          <CardTitle>
            Settings
          </CardTitle>
        </CardHeader>
        <CardBody>
          <GraphDepthAndLengthSettings />
          <hr />
          <GraphDependantsAndDependenciesSettings />
          <hr />
          <GraphInternalExternalRelationshipsSettings />
        </CardBody>
      </Card>
    </div>
  );
}
