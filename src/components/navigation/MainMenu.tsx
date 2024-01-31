import {
  Container, Form, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { DomainContext } from '../../context/DomainContext';
import DomainSelectorOptions from '../toolbox/navigator/DomainSelectorOptions';
import { VisualizationContext } from '../../context/VisualizationContext';

export default function MainMenu() {
  const [searchKey, setSearchKey] = useState('');
  const { currentDomain } = useContext(DomainContext);
  const { enableMovingNodes, setEnableMovingNodes } = useContext(VisualizationContext);

  const handleToggle = (nextShow: boolean) => {
    if (nextShow) return;
    setSearchKey('');
  };

  return (
    <div className="position-absolute p-3 w-100 z-2">
      <Navbar expand="lg" className="w-100 bg-light rounded-3 shadow">
        <Container>
          <Navbar.Brand href="#home">Vopak Architecture Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title={currentDomain ? currentDomain.label : 'Choose domain'}
                active={currentDomain != null}
                onToggle={handleToggle}
              >
                <div style={{ maxHeight: '50dvh' }} className="overflow-y-scroll overflow-x-hidden">
                  <DomainSelectorOptions
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    DropdownComponent={NavDropdown}
                  />
                </div>
              </NavDropdown>
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
