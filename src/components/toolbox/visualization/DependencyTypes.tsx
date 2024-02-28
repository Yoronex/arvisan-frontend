import { useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { GraphContext } from '../../../context';

export default function DependencyTypes() {
  const { settings, updateSettings } = useContext((GraphContext));
  const {
    showWeakDependencies,
    showStrongDependencies,
    showEntityDependencies,
  } = settings;

  const setShowWeakDeps = (value: boolean) => {
    updateSettings({ ...settings, showWeakDependencies: value });
  };

  const setShowStrongDeps = (value: boolean) => {
    updateSettings({ ...settings, showStrongDependencies: value });
  };

  const setShowEntityDeps = (value: boolean) => {
    updateSettings({ ...settings, showEntityDependencies: value });
  };

  return (
    <Form>
      <FormCheck
        onChange={(event) => setShowWeakDeps(event.target.checked)}
        checked={showWeakDependencies}
        type="switch"
        label="Show weak dependencies"
      />
      <FormCheck
        onChange={(event) => setShowStrongDeps(event.target.checked)}
        checked={showStrongDependencies}
        type="switch"
        label="Show strong dependencies"
      />
      <FormCheck
        onChange={(event) => setShowEntityDeps(event.target.checked)}
        checked={showEntityDependencies}
        type="switch"
        label="Show entity dependencies"
      />
    </Form>
  );
}
