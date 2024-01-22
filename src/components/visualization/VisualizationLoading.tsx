import { Spinner } from 'react-bootstrap';

interface Props {
  center: { x: number, y: number };
}

export default function VisualizationLoading({ center }: Props) {
  return (
    <div>
      <div className="position-absolute w-100 h-100 z-1 opacity-25 bg-dark" />
      <div className="position-absolute z-1" style={{ left: center.x, top: center.y }}>
        <div style={{ marginLeft: '-50%', marginTop: '-50%' }}>
          <Spinner variant="primary" animation="border" style={{ width: '6rem', height: '6rem' }} />
        </div>
      </div>
    </div>
  );
}
