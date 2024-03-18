import { useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { GraphSettingsContext } from '../../../context';

export default function GraphInternalExternalRelationshipsSettings() {
  const { settings, updateSettings } = useContext(GraphSettingsContext);
  const {
    showSelectionInternalRelationships,
    showDomainInternalRelationships,
    showExternalRelationships,
    selfEdges,
  } = settings;

  const setShowSelectionInternalRelationships = (value: boolean) => {
    updateSettings((s) => {
      if (!value) {
        return {
          ...s,
          showSelectionInternalRelationships: false,
          showDomainInternalRelationships: false,
        };
      }
      return { ...s, showSelectionInternalRelationships: value };
    });
  };

  const setShowDomainInternalRelationships = (value: boolean) => {
    updateSettings((s) => {
      if (value) {
        return {
          ...s,
          showSelectionInternalRelationships: true,
          showDomainInternalRelationships: true,
        };
      }
      return { ...s, showDomainInternalRelationships: value };
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
        onChange={(event) => setShowSelectionInternalRelationships(event.target.checked)}
        checked={showSelectionInternalRelationships}
        type="switch"
        label="Show selection internal relationships"
      />
      <FormCheck
        onChange={(event) => setShowDomainInternalRelationships(event.target.checked)}
        checked={showDomainInternalRelationships}
        type="switch"
        label="Show domain internal relationships"
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
