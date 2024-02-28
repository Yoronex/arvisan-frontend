import { Modal } from 'react-bootstrap';
import { useContext } from 'react';
import { DependencyCycleRender } from '../../../api';
import { ViolationModalProps } from './ViolationList';
import CyclicalDependenciesDetails from './CyclicalDependenciesDetails';
import { ViolationsContext } from '../../../context';
import { VisibilityOptions } from '../../../helpers/enums';

export default function CyclicalDependenciesModal({
  selectedGroup, onClose,
}: ViolationModalProps<DependencyCycleRender>) {
  const { setVisibility } = useContext(ViolationsContext);

  const cyclicalDependencies = selectedGroup?.items;
  const label = selectedGroup?.label;

  const onHighlight = () => {
    setVisibility((visibility) => {
      const v = { ...visibility };
      if (v.dependencyCycles === VisibilityOptions.INVISIBLE) {
        v.dependencyCycles = VisibilityOptions.HIGHLIGHTED;
      }
      return v;
    });
  };

  const modalContent = () => {
    if (!cyclicalDependencies) return null;
    return (
      <CyclicalDependenciesDetails
        cyclicalDependencies={cyclicalDependencies}
        onHighlight={onHighlight}
      />
    );
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
