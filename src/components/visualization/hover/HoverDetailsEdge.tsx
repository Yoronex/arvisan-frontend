import cytoscape from 'cytoscape';
import { getParents } from '../../../helpers/node';
import { EdgeData, NodeData } from '../../../api';

interface Props {
  edge: cytoscape.EdgeSingular;
}

export default function HoverDetailsEdge({ edge }: Props) {
  const source = edge.source();
  const target = edge.target();

  const allNodes = edge.cy().nodes().map((n): NodeData => n.data());
  const sourceParents = getParents(source.data(), allNodes).slice(1);
  const targetParents = getParents(target.data(), allNodes).slice(1);

  const references = edge.data('properties.references') as EdgeData['properties']['references'];
  const referenceTypes = references.map((r) => r.type);

  return (
    <>
      <tr>
        <td className="pe-2 text-end fw-bold text-nowrap">Internal ID:</td>
        <td>{edge.id().split('--')[0]}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold">Source:</td>
        <td>
          {source.data('label')}
          {' '}
          <span className="fst-italic">
            (
            {sourceParents.map((p) => p.label).join(', ')}
            )
          </span>
        </td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold">Target:</td>
        <td>
          {target.data('label')}
          {' '}
          <span className="fst-italic">
            (
            {targetParents.map((p) => p.label).join(', ')}
            )
          </span>
        </td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold text-nowrap">Function-level dependencies:</td>
        <td>{edge.data('properties.nrFunctionDependencies')}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold text-nowrap">Module-level dependencies:</td>
        <td>{edge.data('properties.nrModuleDependencies')}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold text-nowrap">
          Reference type
          {referenceTypes.length > 1 && 's'}
          :
        </td>
        <td className="text-wrap">{referenceTypes.join(', ')}</td>
      </tr>
    </>
  );
}
