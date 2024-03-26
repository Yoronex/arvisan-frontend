import cytoscape from 'cytoscape';
import { useContext } from 'react';
import HoverDetailsNodeLeaf from './HoverDetailsNodeLeaf';
import HoverDetailsNodeParent from './HoverDetailsNodeParent';
import { ColoringContext } from '../../../context';

interface Props {
  node: cytoscape.NodeSingular;
}

export default function HoverDetailsNode({ node }: Props) {
  const { currentMode } = useContext(ColoringContext);

  const parents = node.parents().toArray();

  const renderColorModeProperty = () => {
    if (!currentMode) return null;
    const value = currentMode.nodeDetailsValue(node);
    if (value == null) return null;
    return (
      <tr>
        <td className="pe-2 text-end fw-bold">
          {currentMode.nodeDetailsTitle}
          :
        </td>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <>
      <tr>
        <td className="pe-2 text-end fw-bold">Internal ID:</td>
        <td>{node.id()}</td>
      </tr>
      <tr>
        <td className="pe-2 text-end fw-bold">Node:</td>
        <td>{node.data('label')}</td>
      </tr>
      <tr>
        <td className="align-top pe-2 text-end fw-bold">Parents:</td>
        {parents.length === 0 ? (
          <td className="fst-italic">None</td>
        ) : (
          <td>
            <ul className="m-0" style={{ marginLeft: '-1rem' }}>
              {parents.map((p) => (
                <li key={p.id()}>
                  <span className="fst-italic">
                    {p.data('properties.layer')}
                    :
                    {' '}
                  </span>
                  {p.data('label')}
                </li>
              ))}
            </ul>
          </td>
        )}
      </tr>
      {node.isChildless() && (<HoverDetailsNodeLeaf node={node} />)}
      {node.isParent() && (<HoverDetailsNodeParent node={node} />)}
      {renderColorModeProperty()}
    </>
  );
}
