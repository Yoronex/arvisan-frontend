import { useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { VisualizationContext } from '../../../context/VisualizationContext';

export default function GraphInternalExternalRelationshipsSettings() {
  const { settings, updateSettings } = useContext(VisualizationContext);
  const { showInternalRelationships, showExternalRelationships, selfEdges } = settings;

  const setShowInternalRelationships = (value: boolean) => {
    updateSettings({
      ...settings,
      showInternalRelationships: value,
    });
  };
  const setShowExternalRelationships = (value: boolean) => {
    updateSettings({
      ...settings,
      showExternalRelationships: value,
    });
  };
  const setSelfEdges = (value: boolean) => {
    updateSettings({
      ...settings,
      selfEdges: value,
    });
  };

  return (
    <Form>
      <FormCheck
        onChange={(event) => setShowInternalRelationships(event.target.checked)}
        checked={showInternalRelationships}
        type="switch"
        label="Show internal relationships"
      />
      <FormCheck
        onChange={(event) => setShowExternalRelationships(event.target.checked)}
        checked={showExternalRelationships}
        type="switch"
        label="Show external relationships"
      />
      <FormCheck
        onChange={(event) => setSelfEdges(event.target.checked)}
        checked={selfEdges}
        type="switch"
        label="Show self edges"
      />
    </Form>
  );
}
