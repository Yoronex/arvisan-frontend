import cytoscape from 'cytoscape';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'react-bootstrap';

interface Props {
  node: cytoscape.NodeSingular | null;
}

export default function HoverDetailsCard({ node }: Props) {
  if (!node) return null;
  return (
    <div className="position-absolute z-2 bottom-0 end-0 mb-3 me-3">
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardBody>
          {node.id()}
        </CardBody>
      </Card>
    </div>
  );
}
