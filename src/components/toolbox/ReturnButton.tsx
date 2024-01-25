import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useContext } from 'react';
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
        <ArrowLeft className="mb-1" />
      </Button>
    </div>
  );
}
