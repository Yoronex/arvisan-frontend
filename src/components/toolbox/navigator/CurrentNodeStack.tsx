import { ReactNode, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { HistoryNode, VisualizationHistory } from '../../../context/VisualizationHistory';
import { NodeData } from '../../../api';

export default function CurrentNodeStack() {
  const { currentNode, visitNode } = useContext(VisualizationHistory);

  if (currentNode == null) {
    return (
      <div>
        <h4>Selected node</h4>
        <p className="fst-italic">No node selected.</p>
      </div>
    );
  }

  const renderNode = (
    node: HistoryNode,
    initial = false,
  ): { depth: number, element: ReactNode } => {
    let topElements: ReactNode | null = null;
    let depth = 0;

    if (node.type === 'cytoscape' && node.data.isChild()) {
      const data = node.data.parent().first();
      const result = renderNode({ type: 'cytoscape', data, timestamp: new Date() });
      topElements = result.element;
      depth = result.depth + 1;
    }

    const data = node.type === 'cytoscape' ? node.data.data() as NodeData : node.data;
    const classes = ['list-group-item', 'list-group-item-action'];
    if (initial) classes.push('active');

    return {
      depth,
      element: (
        <>
          {topElements}
          <button
            className={classes.join(' ')}
            style={{ paddingLeft: `${depth + 0.75}rem` }}
            aria-current={initial}
            onClick={() => { if (!initial) visitNode(node); }}
            type="button"
          >
            <span className="fw-bold">{data.properties.layer}</span>
            {': '}
            {data.label}
          </button>
        </>
      ),
    };
  };

  return (
    <div>
      <h4>Selected node</h4>
      <ListGroup>
        {renderNode(currentNode, true).element}
      </ListGroup>
    </div>
  );
}
