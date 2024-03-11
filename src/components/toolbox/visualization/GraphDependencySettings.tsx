import { useContext } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { GraphContext } from '../../../context/GraphContext';
import MultiRangeSlider from '../../forms/MultiRangeSlider';

const RANGE_MIN = 0;
const RANGE_MAX = 20;

export default function GraphDependencySettings() {
  const { settings, updateSettings } = useContext(GraphContext);
  const {
    showOutgoing, minOutgoing, maxOutgoing,
    showIncoming, minIncoming, maxIncoming,
  } = settings;

  const setOutgoingRange = (values: [number, number]) => {
    updateSettings({
      ...settings,
      minOutgoing: values[0],
      maxOutgoing: values[1],
    });
  };

  const setIncomingRange = (values: [number, number]) => {
    updateSettings({
      ...settings,
      minIncoming: values[0],
      maxIncoming: values[1],
    });
  };

  const setShowOutgoing = (value: boolean) => {
    updateSettings({
      ...settings,
      showOutgoing: value,
    });
  };

  const setShowIncoming = (value: boolean) => {
    updateSettings({
      ...settings,
      showIncoming: value,
    });
  };

  return (
    <>
      <Form className="mb-4">
        <MultiRangeSlider
          onChange={setOutgoingRange}
          values={[minOutgoing, maxOutgoing]}
          min={RANGE_MIN}
          max={RANGE_MAX}
          label="Number of outgoing arrows"
          disabled={showOutgoing ? [false, false] : [true, true]}
          infinity
        />
        <FormCheck
          onChange={(event) => setShowOutgoing(event.target.checked)}
          checked={showOutgoing}
          type="switch"
          label="Query & show outgoing relationships"
        />
      </Form>
      <Form>
        <MultiRangeSlider
          onChange={setIncomingRange}
          values={[minIncoming, maxIncoming]}
          min={RANGE_MIN}
          max={RANGE_MAX}
          label="Number of incoming arrows"
          disabled={showIncoming ? [false, false] : [true, true]}
          infinity
        />
        <FormCheck
          onChange={(event) => setShowIncoming(event.target.checked)}
          checked={showIncoming}
          type="switch"
          label="Query & show incoming relationships"
        />
      </Form>
    </>
  );
}
