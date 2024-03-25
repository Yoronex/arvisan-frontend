import cytoscape from 'cytoscape';
import { getInboundEncapsulation, getOutboundEncapsulation } from '../../../helpers/metrics';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNodeParent({ node }: Props) {
  const dependencyProfile = node.data('properties.dependencyProfile');
  const inboundEncapsulation = getInboundEncapsulation(dependencyProfile);
  const outboundEncapsulation = getOutboundEncapsulation(dependencyProfile);

  return (
    <>
      <tr>
        <td className="pe-2 text-end fw-bold">Dependency profile:</td>
        <td>{`<${dependencyProfile.join(', ')}>`}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold">Inbound/Outbound encapsulation</td>
        <td>{`<${inboundEncapsulation.toFixed(4)}, ${outboundEncapsulation.toFixed(4)}>`}</td>
      </tr>
    </>
  );
}
