import cytoscape from 'cytoscape';
import { ReactNode } from 'react';
import { getParents } from '../../../helpers/node';
import { EdgeData, NodeData } from '../../../api';

interface Props {
  edge: cytoscape.EdgeSingular;
  allReferenceKeys?: boolean,
}

export default function HoverDetailsEdge({ edge, allReferenceKeys }: Props) {
  const source = edge.source();
  const target = edge.target();

  const allNodes = edge.cy().nodes().map((n): NodeData => n.data());
  const sourceParents = getParents(source.data(), allNodes).slice(1);
  const targetParents = getParents(target.data(), allNodes).slice(1);

  const referenceNames = edge.data('properties.referenceNames') as EdgeData['properties']['referenceNames'];
  const referenceNameText: ReactNode = referenceNames.length > 1 && !allReferenceKeys ? (
    <>
      {referenceNames[0]}
      {' '}
      <span className="fst-italic">
        and
        {' '}
        {referenceNames.length - 1}
        {' '}
        more...
      </span>
    </>
  ) : referenceNames.join(', ');

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
        <td className="pe-2 text-end fw-bold text-nowrap">Reference key:</td>
        <td className="text-break">{referenceNameText}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold text-nowrap">Reference types:</td>
        <td className="text-truncate">{(edge.data('properties.referenceTypes') as EdgeData['properties']['referenceTypes']).join(', ')}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold text-nowrap">Dependency types:</td>
        <td className="text-truncate">{(edge.data('properties.dependencyTypes') as EdgeData['properties']['dependencyTypes']).join(', ')}</td>
      </tr>
    </>
  );
}

HoverDetailsEdge.defaultProps = ({
  allReferenceKeys: false,
});
