import { useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { VisualizationContext } from '../../../context/VisualizationContext';
import MultiRangeSlider from '../../settings/MultiRangeSlider';

const RANGE_MIN = 0;
const RANGE_MAX = 20;

export default function GraphDependantsAndDependenciesSettings() {
  const { settings, updateSettings } = useContext(VisualizationContext);
  const {
    showDependencies, minDependencies, maxDependencies,
    showDependents, minDependents, maxDependents,
  } = settings;

  const setDependencyRange = (values: [number, number]) => {
    updateSettings({
      ...settings,
      minDependencies: values[0],
      maxDependencies: values[1],
    });
  };

  const setDependentRange = (values: [number, number]) => {
    updateSettings({
      ...settings,
      minDependents: values[0],
      maxDependents: values[1],
    });
  };

  const setShowDependencies = (value: boolean) => {
    updateSettings({
      ...settings,
      showDependencies: value,
    });
  };

  const setShowDependents = (value: boolean) => {
    updateSettings({
      ...settings,
      showDependents: value,
    });
  };

  return (
    <>
      <Form className="mb-4">
        <MultiRangeSlider
          onChange={setDependencyRange}
          values={[minDependencies, maxDependencies]}
          min={RANGE_MIN}
          max={RANGE_MAX}
          label="Number of dependencies"
        />
        <FormCheck
          onChange={(event) => setShowDependencies(event.target.checked)}
          checked={showDependencies}
          type="switch"
          label="Query & show dependency relationships"
        />
      </Form>
      <Form>
        <MultiRangeSlider
          onChange={setDependentRange}
          values={[minDependents, maxDependents]}
          min={RANGE_MIN}
          max={RANGE_MAX}
          label="Number of dependents"
        />
        <FormCheck
          onChange={(event) => setShowDependents(event.target.checked)}
          checked={showDependents}
          type="switch"
          label="Query & show dependent relationships"
        />
      </Form>
    </>
  );
}