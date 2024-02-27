import cytoscape from 'cytoscape';

interface Props {
  edge: cytoscape.EdgeSingular;
}

export default function HoverDetailsEdge({ edge }: Props) {
  const source = edge.source();
  const target = edge.target();

  const referenceKeys = edge.data('properties.referenceKeys');
  const referenceKeyText = referenceKeys.length > 1 ? `${referenceKeys[0]} and ${referenceKeys.length - 1} more...` : referenceKeys[0];

  return (
    <table>
      <tbody>
        <tr>
          <td className="pe-2 text-end">Internal ID:</td>
          <td>{edge.id().split('--')[0]}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end">Source:</td>
          <td>{source.data('label')}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end">Target:</td>
          <td>{target.data('label')}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end">Reference key:</td>
          <td className="text-truncate">{referenceKeyText}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end">Reference type:</td>
          <td className="text-truncate">{edge.data('properties.referenceTypes').join(', ')}</td>
        </tr>
        <tr>
          <td className="pe-2 text-end">Dependency type:</td>
          <td className="text-truncate">{edge.data('properties.dependencyTypes').join(', ')}</td>
        </tr>
      </tbody>
    </table>
  );
}
