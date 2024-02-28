import { Modal } from 'react-bootstrap';
import { ViolationModalProps } from './ViolationList';
import { LayerViolation } from '../../../api';
import SubLayerViolationsDetails from './SubLayerViolationsDetails';

export default function SubLayerViolationsModal({
  selectedGroup, onClose,
}: ViolationModalProps<LayerViolation>) {
  const modalContent = () => {
    if (!selectedGroup) return null;
    return <SubLayerViolationsDetails violations={selectedGroup.items} />;
  };

  const open = !!selectedGroup;

  return (
    <Modal show={open} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Sublayer violations of
          {' '}
          {selectedGroup?.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalContent()}
      </Modal.Body>
    </Modal>
  );
}

SubLayerViolationsModal.defaultProps = ({
  selectedGroup: undefined,
});
