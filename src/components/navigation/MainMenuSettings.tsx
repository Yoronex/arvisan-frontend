import { Form, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { GraphContext } from '../../context';

export default function MainMenuSettings() {
  const {
    enableMovingNodes, setEnableMovingNodes,
    enableHoverDetails, setEnableHoverDetails,
  } = useContext(GraphContext);

  return (
    <NavDropdown title={<FontAwesomeIcon icon={faGear} title="Settings" />}>
      <Form className="dropdown-item-text text-nowrap">
        <Form.Check
          type="switch"
          label="Enable moving nodes"
          id="enable-moving-nodes"
          checked={enableMovingNodes}
          onChange={() => setEnableMovingNodes(!enableMovingNodes)}
        />
      </Form>
      <Form className="dropdown-item-text text-nowrap">
        <Form.Check
          type="switch"
          label="Enable details on hover"
          id="enable-hover-details"
          checked={enableHoverDetails}
          onChange={() => setEnableHoverDetails(!enableHoverDetails)}
        />
      </Form>
    </NavDropdown>
  );
}
