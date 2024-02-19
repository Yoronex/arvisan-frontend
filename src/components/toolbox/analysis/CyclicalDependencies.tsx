import { useContext } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ViolationsContext } from '../../../context';

export default function CyclicalDependencies() {
  const { violations } = useContext(ViolationsContext);
  const { dependencyCycles } = violations;

  return (
    <div>
      <h4>(Indirect) cyclical dependencies</h4>
      <ListGroup>
        {dependencyCycles.map((d) => (
          <ListGroupItem
            action
            key={d.node.id}
            className="d-flex justify-content-between align-items-center flex-nowrap"
            title={d.node.label}
          >
            <div className="text-truncate">{d.node.label}</div>
            <FontAwesomeIcon className="ms-2" icon={faArrowUpRightFromSquare} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
