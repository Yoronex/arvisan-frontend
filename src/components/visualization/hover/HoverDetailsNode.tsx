import cytoscape from 'cytoscape';
import { getNrIncomingFunctionDeps, getNrOutgoingFunctionDeps } from '../../../cytoscape/operations';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNode({ node }: Props) {
  const parents = node.parents().toArray();

  return (
    <table>
      <tbody>
        <tr>
          <td className="pe-2 text-end fw-bold">Internal ID:</td>
          <td>{node.id()}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end fw-bold">Node:</td>
          <td>{node.data('label')}</td>
        </tr>
        <tr>
          <td className="align-top pe-2 text-end fw-bold">Parents:</td>
          {parents.length === 0 ? (
            <td className="fst-italic">None</td>
          ) : (
            <td>
              <ul className="m-0" style={{ marginLeft: '-1rem' }}>
                {parents.map((p) => (
                  <li key={p.id()}>
                    <span className="fst-italic">
                      {p.data('properties.layer')}
                      :
                      {' '}
                    </span>
                    {p.data('label')}
                  </li>
                ))}
              </ul>
            </td>
          )}
        </tr>
        {node.isChildless() && (
        <>
          <tr>
            <td className="pe-2 text-end fw-bold"># Outgoing edges:</td>
            <td>{node.outdegree(true)}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Total outgoing func. dependencies:</td>
            <td>{getNrOutgoingFunctionDeps(node)}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold"># Incoming edges:</td>
            <td>{node.indegree(true)}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Total incoming func. dependencies:</td>
            <td>{getNrIncomingFunctionDeps(node)}</td>
          </tr>
        </>
        )}
      </tbody>
    </table>
  );
}
