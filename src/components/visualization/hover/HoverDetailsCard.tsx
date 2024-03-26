import cytoscape from 'cytoscape';
import { useMemo } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'react-bootstrap';
import HoverDetailsNode from './HoverDetailsNode';
import HoverDetailsEdge from './HoverDetailsEdge';

interface Props {
  element: cytoscape.Singular | null;
}

export default function HoverDetailsCard({ element }: Props) {
  const content = useMemo(() => {
    if (!element) return null;
    if (!!element.isNode && element.isNode()) {
      return <HoverDetailsNode node={element} />;
    }
    if (!!element.isEdge && element.isEdge()) {
      return <HoverDetailsEdge edge={element} />;
    }
    return null;
  }, [element]);

  if (!content) return null;

  return (
    <div className="position-absolute z-2 bottom-0 end-0 mb-3 me-3" style={{ maxWidth: 'max(50%, 650px)' }}>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardBody>
          <table>
            <tbody>
              {content}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
