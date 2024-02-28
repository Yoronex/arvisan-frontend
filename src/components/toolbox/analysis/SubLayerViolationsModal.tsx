import { Modal } from 'react-bootstrap';
import { useContext } from 'react';
import { ViolationModalProps } from './ViolationList';
import { LayerViolation } from '../../../api';
import SubLayerViolationsDetails from './SubLayerViolationsDetails';
import { ViolationsContext } from '../../../context';
import { VisibilityOptions } from '../../../helpers/enums';

export default function SubLayerViolationsModal({
  selectedGroup, onClose,
}: ViolationModalProps<LayerViolation>) {
  const { setVisibility } = useContext(ViolationsContext);

  const layerViolations = selectedGroup?.items;
  const label = selectedGroup?.label;

  const onHighlight = () => {
    setVisibility((visibility) => {
      const v = { ...visibility };
      if (v.subLayers === VisibilityOptions.INVISIBLE) {
        v.subLayers = VisibilityOptions.HIGHLIGHTED;
      }
      return v;
    });
  };

  const modalContent = () => {
    if (!layerViolations) return null;
    return (
      <SubLayerViolationsDetails
        violations={layerViolations}
        onHighlight={onHighlight}
      />
    );
  };

  const open = !!selectedGroup;

  return (
    <Modal show={open} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Sublayer violations of
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

SubLayerViolationsModal.defaultProps = ({
  selectedGroup: undefined,
});
