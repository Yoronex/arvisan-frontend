import cytoscape from 'cytoscape';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNode({ node }: Props) {
  const parents = node.parents().toArray();
  const outgoers = node.outgoers().filter((ele) => ele.isEdge()).toArray();
  const incomers = node.incomers().filter((ele) => ele.isEdge()).toArray();

  return (
    <table>
      <tbody>
        <tr>
          <td className="pe-2 text-end">Internal ID:</td>
          <td>{node.id()}</td>
        </tr>
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
            <td className="pe-2 text-end"># Outgoing edges:</td>
            <td>{node.outdegree(true)}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end">Total outgoing dependencies:</td>
            <td>{outgoers.reduce((total, edge) => total + Number(edge.data('properties.weight')), 0)}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end"># Incoming edges:</td>
            <td>{node.indegree(true)}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end">Total incoming dependencies:</td>
            <td>{incomers.reduce((total, edge) => total + Number(edge.data('properties.weight')), 0)}</td>
          </tr>
        </>
        )}
      </tbody>
    </table>
  );
}
