import {
  Container, Form, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { GraphContext } from '../../context';
import Breadcrumbs from './Breadcrumbs';

export default function MainMenu() {
  const { enableMovingNodes, setEnableMovingNodes } = useContext(GraphContext);

  return (
    <div className="position-absolute p-3 w-100 z-2">
      <Navbar expand="lg" className="w-100 bg-light rounded-3 shadow">
        <Container>
          <Navbar.Brand href="#home">Vopak Architecture Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center">
              <Breadcrumbs />
            </Nav>
            <Nav>
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
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
