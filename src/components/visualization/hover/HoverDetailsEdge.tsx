import cytoscape from 'cytoscape';
import { ReactNode } from 'react';

interface Props {
  edge: cytoscape.EdgeSingular;
}

export default function HoverDetailsEdge({ edge }: Props) {
  const source = edge.source();
  const target = edge.target();

  const referenceKeys = edge.data('properties.referenceKeys');
  const referenceKeyText: ReactNode = referenceKeys.length > 1 ? (
    <>
      {referenceKeys[0]}
      {' '}
      <span className="fst-italic">
        and
        {' '}
        {referenceKeys.length - 1}
        {' '}
        more...
      </span>
    </>
  ) : referenceKeys[0];

  return (
    <table>
      <tbody>
        <tr>
          <td className="pe-2 text-end fw-bold">Internal ID:</td>
          <td>{edge.id().split('--')[0]}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end fw-bold">Source:</td>
          <td>{source.data('label')}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end fw-bold">Target:</td>
          <td>{target.data('label')}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end fw-bold">Reference key:</td>
          <td className="text-truncate">{referenceKeyText}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end fw-bold">Reference type:</td>
          <td className="text-truncate">{edge.data('properties.referenceTypes').join(', ')}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end fw-bold">Dependency type:</td>
          <td className="text-truncate">{edge.data('properties.dependencyTypes').join(', ')}</td>
        </tr>
      </tbody>
    </table>
  );
}
