import cytoscape from 'cytoscape';
import { getDependencyProfile } from '../../../modules/outsystems';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNodeParent({ node }: Props) {
  const dependencyProfile = getDependencyProfile(node);
  const dependencyProfileSum = dependencyProfile.reduce((total, x) => total + x, 0);

  const inboundEncapsulation = (dependencyProfile[1] + dependencyProfile[3])
    / dependencyProfileSum;
  const outboundEncapsulation = (dependencyProfile[2] + dependencyProfile[3])
    / dependencyProfileSum;

  return (
    <>
      <tr>
        <td className="pe-2 text-end fw-bold">Dependency profile:</td>
        <td>{`<${dependencyProfile.join(', ')}>`}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold">Encapsulation score:</td>
        <td>{`<${inboundEncapsulation.toFixed(4)}, ${outboundEncapsulation.toFixed(4)}>`}</td>
      </tr>
    </>
  );
}
