import { useState } from 'react';
import {
  Alert, Button, Modal, Tab, Tabs,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import SeederDataImporter from './SeederDataImporter';
import SeederDataParser from './SeederDataParser';

export default function SeederModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Seeder</Button>
      <Modal show={open} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Arvisan data loader</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This dialog allows you to load new datasets into Arvisan.</p>
          <Alert variant="danger">
            <Alert.Heading>
              <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
              Destructive operation
            </Alert.Heading>
            Note that using the data loader is a destructive operation.
            All existing data in the database will be deleted and is unrecoverable.
          </Alert>
          <Alert variant="info" className="d-flex flex-row gap-2 align-items-center">
            <FontAwesomeIcon icon={faClock} />
            Note that these operations might take a while to complete.
          </Alert>
          <Tabs defaultActiveKey="parse" className="mb-3 flex-row">
            <Tab title={<span className="mx-2">Parse</span>} eventKey="parse">
              <SeederDataParser />
            </Tab>
            <Tab title={<span className="mx-2">Import</span>} eventKey="import">
              <SeederDataImporter />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}
