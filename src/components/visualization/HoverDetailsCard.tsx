import cytoscape from 'cytoscape';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'react-bootstrap';

interface Props {
  node: cytoscape.NodeSingular | null;
}

export default function HoverDetailsCard({ node }: Props) {
  if (!node) return null;

  const parents = node.parents().toArray();

  return (
    <div className="position-absolute z-2 bottom-0 end-0 mb-3 me-3">
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardBody>
          <table>
            <tbody>
              <tr>
                <td className="pe-2 text-end">Node:</td>
                <td>{node.data('label')}</td>
              </tr>
              <tr>
                <td className="align-top pe-2 text-end">Parents:</td>
                {parents.length === 0 ? (
                  <td className="fst-italic">None</td>
                ) : (
                  <td>
                    <ul className="m-0" style={{ marginLeft: '-1rem' }}>
                      {parents.map((p) => (
                        <li key={p.id()}>{p.data('label')}</li>
                      ))}
                    </ul>
                  </td>
                )}
              </tr>
              {node.isChildless() && (
                <>
                  <tr>
                    <td className="pe-2 text-end">Dependencies:</td>
                    <td>{node.outdegree(true)}</td>
                  </tr>
                  <tr>
                    <td className="pe-2 text-end">Dependents:</td>
                    <td>{node.indegree(true) - 1}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
