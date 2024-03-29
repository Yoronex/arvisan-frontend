import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { GraphSettingsContext } from '../../../context';
import RangeSlider from '../../forms/RangeSlider';
import GraphLayerDepth from './GraphLayerDepth';

export default function GraphDepthAndLengthSettings() {
  const { settings, updateSettings } = useContext(GraphSettingsContext);
  const { dependencyLength } = settings;

  const setDependencyLength = (value: number) => {
    updateSettings({
      ...settings,
      dependencyLength: value,
    });
  };

  return (
    <Form className="mb-4 w-100 d-flex flex-column gap-2">
      <GraphLayerDepth />
      <RangeSlider value={dependencyLength} onChange={setDependencyLength} min={0} max={5} label="Dependency length" />
    </Form>
  );
}
