import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { HistoryNode, VisualizationHistory } from '../../../context/VisualizationHistory';
import { NodeData } from '../../../api';

export default function GraphHistory() {
  const { history, historyStackPosition, back } = useContext(VisualizationHistory);

  const renderListItem = (node: HistoryNode, position: number) => {
    const data = node.type === 'cytoscape' ? node.data.data() as NodeData : node.data;

    return (
      <ListGroup.Item
        key={`${data.id}-${node.timestamp.getTime()}`}
        active={historyStackPosition === position}
        action
        onClick={() => back(position - historyStackPosition)}
      >
        <span className="fw-bold">{data.properties.layer}</span>
        {': '}
        {data.label}
      </ListGroup.Item>
    );
  };

  return (
    <div>
      <h4>History</h4>
      <div className="overflow-x-hidden overflow-y-scroll" style={{ maxHeight: '20rem' }}>
        <ListGroup>
          {history.map((n, index) => renderListItem(n, index))}
        </ListGroup>
      </div>
    </div>
  );
}
