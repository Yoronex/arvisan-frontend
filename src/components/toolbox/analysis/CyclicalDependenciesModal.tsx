import { Modal } from 'react-bootstrap';
import { DependencyCycleRender } from '../../../api';
import { ViolationModalProps } from './ViolationList';
import CyclicalDependenciesDetails from './CyclicalDependenciesDetails';

export default function CyclicalDependenciesModal({
  selectedGroup, onClose,
}: ViolationModalProps<DependencyCycleRender>) {
  const cyclicalDependencies = selectedGroup?.items;
  const label = selectedGroup?.label;

  const modalContent = () => {
    if (!cyclicalDependencies) return null;
    return <CyclicalDependenciesDetails cyclicalDependencies={cyclicalDependencies} />;
  };

  const open = !!cyclicalDependencies;

  return (
    <Modal show={open} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Cyclical dependency details of
          {' '}
          {label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalContent()}
      </Modal.Body>
    </Modal>
  );
}

CyclicalDependenciesModal.defaultProps = ({
  selectedGroup: undefined,
});
