import cytoscape from 'cytoscape';
import { Modal } from 'react-bootstrap';
import GraphElementDetailsNode from './GraphElementDetailsNode';
import GraphElementDetailsEdge from './GraphElementDetailsEdge';

interface Props {
  element: cytoscape.Singular | null;
  onClose: () => void;
}

export default function GraphElementDetailsModal({ element, onClose }: Props) {
  if (!element) return null;

  const getHeader = () => {
    if (element.isNode()) {
      return `Details of ${element.data('label')}`;
    } if (element.isEdge()) {
      return 'Details of edge';
    }
    return 'Details';
  };

  const getBody = () => {
    if (element.isNode()) {
      return <GraphElementDetailsNode node={element} onClose={onClose} />;
    } if (element.isEdge()) {
      return <GraphElementDetailsEdge edge={element} onClose={onClose} />;
    }
    return null;
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{getHeader()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getBody()}
      </Modal.Body>
    </Modal>
  );
}
