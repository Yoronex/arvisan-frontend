import cytoscape from 'cytoscape';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import HoverDetailsNode from '../hover/HoverDetailsNode';
import { ViolationsContext, VisualizationHistory } from '../../../context';
import CyclicalDependenciesDetails from '../../toolbox/analysis/CyclicalDependenciesDetails';
import SubLayerViolationsDetails from '../../toolbox/analysis/SubLayerViolationsDetails';
import { getFileSizeKB, getInboundEncapsulation, getOutboundEncapsulation } from '../../../helpers/metrics';

interface Props {
  node: cytoscape.NodeSingular
  onClose: () => void;
}

export default function GraphElementDetailsNode({ node, onClose }: Props) {
  const { violations } = useContext(ViolationsContext);
  const { visitNode } = useContext(VisualizationHistory);

  const cyclicalDeps = violations.dependencyCycles
    .filter((v) => v.node.id === node.id());
  const subLayerViolations = violations.subLayers
    .filter((v) => v.target === node.id() || v.source === node.id());

  const dependencyProfile = node.data('properties.dependencyProfile');
  const inboundEncapsulation = getInboundEncapsulation(dependencyProfile);
  const outboundEncapsulation = getOutboundEncapsulation(dependencyProfile);

  const handleVisitNode = () => {
    visitNode({
      type: 'cytoscape',
      timestamp: new Date(),
      data: node,
    });
    onClose();
  };

  return (
    <div className="d-flex flex-column gap-5">
      <table>
        <tbody>
          <HoverDetailsNode node={node} />
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <td colSpan={2}>
              <hr />
            </td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Size:</td>
            <td>
              {getFileSizeKB(node).toLocaleString()}
              {' '}
              KB
            </td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Cohesion:</td>
            <td>{node.data('properties.cohesion')}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Dependency profile:</td>
            <td>{`<${dependencyProfile.join(', ')}>`}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Inbound/Outbound encapsulation:</td>
            <td>{`<${inboundEncapsulation.toFixed(4)}, ${outboundEncapsulation.toFixed(4)}>`}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Number of screens:</td>
            <td>{node.data('properties.nrScreens')}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Number of entities:</td>
            <td>{node.data('properties.nrEntities')}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Number of public elements:</td>
            <td>{node.data('properties.nrPublicElements')}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Number of REST consumers:</td>
            <td>{node.data('properties.nrRESTConsumers')}</td>
          </tr>
          <tr>
            <td className="pe-2 text-end fw-bold">Number of REST producers:</td>
            <td>{node.data('properties.nrRESTProducers')}</td>
          </tr>
        </tbody>
      </table>

      <Button onClick={handleVisitNode}>Select this node</Button>

      <div className="w-100">
        <h3>Cyclical dependencies</h3>
        <CyclicalDependenciesDetails cyclicalDependencies={cyclicalDeps} onHighlight={onClose} />
      </div>
      <div>
        <h3>Sublayer violations</h3>
        <SubLayerViolationsDetails violations={subLayerViolations} onHighlight={onClose} />
      </div>
    </div>
  );
}
