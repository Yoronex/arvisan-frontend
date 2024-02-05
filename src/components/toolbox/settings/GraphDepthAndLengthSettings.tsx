import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { VisualizationContext } from '../../../context/VisualizationContext';
import RangeSlider from '../../forms/RangeSlider';

export default function GraphDepthAndLengthSettings() {
  const { settings, updateSettings } = useContext(VisualizationContext);
  const { layerDepth, dependencyLength } = settings;

  const setLayerDepth = (value: number) => {
    updateSettings({
      ...settings,
      layerDepth: value,
    });
  };

  const setDependencyLength = (value: number) => {
    updateSettings({
      ...settings,
      dependencyLength: value,
    });
  };

  return (
    <Form className="mb-4 w-100 d-flex flex-column gap-2">
      <RangeSlider value={layerDepth} onChange={setLayerDepth} min={0} max={5} label="Layer depth" />
      <RangeSlider value={dependencyLength} onChange={setDependencyLength} min={0} max={5} label="Dependency length" />
    </Form>
  );
}
