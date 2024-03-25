import cytoscape from 'cytoscape';
import {
  getInboundEncapsulation,
  getNrIncomingFunctionDeps,
  getNrOutgoingFunctionDeps,
  getOutboundEncapsulation,
} from '../../../helpers/metrics';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNodeLeaf({ node }: Props) {
  const dependencyProfile = node.data('properties.dependencyProfile');
  const inboundEncapsulation = getInboundEncapsulation(dependencyProfile);
  const outboundEncapsulation = getOutboundEncapsulation(dependencyProfile);

  return (
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
      <tr>
        <td className="pe-2 text-end fw-bold">Inbound/Outbound encapsulation</td>
        <td>{`<${inboundEncapsulation.toFixed(4)}, ${outboundEncapsulation.toFixed(4)}>`}</td>
      </tr>
    </>
  );
}
