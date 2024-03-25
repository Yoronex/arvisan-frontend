import {
  Container, Nav, Navbar,
} from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import MainMenuSettings from './MainMenuSettings';

export default function MainMenu() {
  return (
    <div className="position-absolute p-3 w-100">
      <Navbar expand="lg" className="w-100 z-2 bg-light rounded-3 shadow">
        <Container>
          <Navbar.Brand href="#home">Vopak Architecture Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center">
              <Breadcrumbs />
            </Nav>
            <Nav>
              <MainMenuSettings />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
