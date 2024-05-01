import {
  Alert, Modal, Tab, Tabs,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import SeederDataImporter from './SeederDataImporter';
import SeederDataParser from './SeederDataParser';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function SeederModal({ open, handleClose }: Props) {
  return (
    <Modal show={open} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Arvisan input parser</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This dialog allows you to parse datasets into the Arvisan format and optionally
          load these into the database. Each type of file is optional, so you should provide
          zero or more. The structure of each of the files can be found in the
          {' '}
          <a href="https://github.com/Yoronex/arvisan-input-parser/blob/master/src/input-spec.ts" target="_blank" rel="noreferrer">
            input specification definitions in the input parser repository
          </a>
          , as this parser is executing the parsing and importing.
        </p>
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
  );
}
