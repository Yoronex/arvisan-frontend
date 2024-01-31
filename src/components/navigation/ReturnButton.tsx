import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { VisualizationHistory } from '../../context/VisualizationHistory';

export default function ReturnButton() {
  const { back, canGoBack } = useContext(VisualizationHistory);

  return (
    <div>
      <Button
        title="Go back to previous node"
        disabled={!canGoBack()}
        onClick={back}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    </div>
  );
}
