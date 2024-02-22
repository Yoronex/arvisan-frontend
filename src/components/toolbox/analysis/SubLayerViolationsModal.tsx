import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { ViolationModalProps } from './ViolationList';
import { LayerViolation } from '../../../api';
import { GraphHighlightContext } from '../../../context';

export default function SubLayerViolationsModal({
  selectedGroup, onClose,
}: ViolationModalProps<LayerViolation>) {
  const { highlightEdges } = useContext(GraphHighlightContext);

  const onHighlight = (d: LayerViolation) => {
    highlightEdges([d]);
    onClose();
  };

  const renderSublayerViolation = (violation: LayerViolation) => (
    <div>
      <h5 className="d-flex flex-wrap align-items-center gap-2">
        <Button
          title="Highlight this cyclical dependency"
          onClick={() => onHighlight(violation)}
        >
          <FontAwesomeIcon icon={faBinoculars} size="sm" />
        </Button>
        <div>Rendered dependency:</div>
        <div className="">
          {violation.sourceNode?.label}
          {' '}
          <FontAwesomeIcon icon={faArrowRightLong} />
          {' '}
          {violation.targetNode?.label}
        </div>
      </h5>
      Actual dependencies:
      <div>
        <ul>
          {violation.actualEdges.map((c) => (
            <li
              className="mb-2"
              key={`${c.source}-${c.target}`}
            >
              {violation.sourceNode.label}
              {' '}
              <FontAwesomeIcon icon={faArrowRightLong} />
              {' '}
              {violation.targetNode.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const modalContent = () => {
    if (!selectedGroup) return null;
    return selectedGroup.items.map((l, i) => {
      if (i === 0) return renderSublayerViolation(l);
      return (
        <>
          <hr />
          {renderSublayerViolation(l)}
        </>
      );
    });
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
