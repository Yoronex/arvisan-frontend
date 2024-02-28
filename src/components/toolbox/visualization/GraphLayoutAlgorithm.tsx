import { Button, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { VisualizationLayoutContext } from '../../../context/VisualizationLayoutContext';
import { VisualizationAlgorithm } from '../../../helpers/enums';

export default function GraphLayoutAlgorithm() {
  const { algorithm, setAlgorithm, reload } = useContext(VisualizationLayoutContext);

  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="layout-algorithm">Layout algorithm</Form.Label>
        <Form.Select
          id="layout-algorithm"
          value={algorithm}
          onChange={(event) => setAlgorithm(event.target.value as VisualizationAlgorithm)}
        >
          {Object.values(VisualizationAlgorithm).map((alg) => (
            <option value={alg} key={alg}>{alg}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button className="w-100 mt-2" size="sm" onClick={reload}>
        Reload layout
      </Button>
    </Form>
  );
}
