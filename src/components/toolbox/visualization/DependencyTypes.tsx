import { useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { GraphSettingsContext } from '../../../context';

export default function DependencyTypes() {
  const { settings, updateSettings } = useContext((GraphSettingsContext));
  const {
    showRuntimeDependencies,
    showCompileTimeDependencies,
    showEntityDependencies,
  } = settings;

  const setShowWeakDeps = (value: boolean) => {
    updateSettings({ ...settings, showRuntimeDependencies: value });
  };

  const setShowStrongDeps = (value: boolean) => {
    updateSettings({ ...settings, showCompileTimeDependencies: value });
  };

  const setShowEntityDeps = (value: boolean) => {
    updateSettings({ ...settings, showEntityDependencies: value });
  };

  return (
    <Form>
      <FormCheck
        onChange={(event) => setShowWeakDeps(event.target.checked)}
        checked={showRuntimeDependencies}
        type="switch"
        label="Show runtime (weak) dependencies"
      />
      <FormCheck
        onChange={(event) => setShowStrongDeps(event.target.checked)}
        checked={showCompileTimeDependencies}
        type="switch"
        label="Show compile-time (strong) dependencies"
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
