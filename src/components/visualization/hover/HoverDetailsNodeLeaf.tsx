import cytoscape from 'cytoscape';
import {
  getInboundEncapsulation,
  getNrIncomingFunctionDeps,
  getNrOutgoingFunctionDeps,
  getOutboundEncapsulation,
} from '../../../helpers/metrics';
import { getDependencyProfileCategory } from '../../../hooks/metrics/useDependencyProfileMetrics';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNodeLeaf({ node }: Props) {
  const dependencyProfileCategory = getDependencyProfileCategory(node);

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
      {dependencyProfileCategory && (
        <tr>
          <td className="pe-2 text-end fw-bold">Dependency profile:</td>
          <td>{dependencyProfileCategory}</td>
        </tr>
      )}
    </>
  );
}
