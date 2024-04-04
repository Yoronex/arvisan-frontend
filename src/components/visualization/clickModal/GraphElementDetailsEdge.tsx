import cytoscape from 'cytoscape';
import { useContext } from 'react';
import HoverDetailsEdge from '../hover/HoverDetailsEdge';
import { ViolationsContext } from '../../../context';
import CyclicalDependenciesDetails from '../../toolbox/analysis/CyclicalDependenciesDetails';
import SubLayerViolationsDetails from '../../toolbox/analysis/SubLayerViolationsDetails';
import { EdgeData } from '../../../api';

interface Props {
  edge: cytoscape.EdgeSingular;
  onClose: () => void;
}

export default function GraphElementDetailsEdge({ edge, onClose }: Props) {
  const { violations } = useContext(ViolationsContext);

  const edgeId = edge.id().split('--')[0];

  const cyclicalDeps = violations.dependencyCycles
    .filter((v) => v.path.some((e) => e.id === edgeId));
  const subLayerViolations = violations.subLayers
    .filter((v) => v.id === edgeId);

  const references = edge.data('properties.references') as EdgeData['properties']['references'];

  return (
    <div className="d-flex flex-column gap-5">
      <table>
        <tbody>
          <HoverDetailsEdge edge={edge} />
          <tr>
            <td className="pe-2 text-end fw-bold text-nowrap">References</td>
            <td>
              <div className="d-flex flex-column gap-2">
                {references.map(({ type, names }) => (
                  <div key={type}>
                    <span className="fst-italic fw-bold">
                      {type}
                      :
                      {' '}
                    </span>
                    {names.join(', ')}
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
