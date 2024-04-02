import { Alert, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { IMetricSettings } from '../../../helpers/metrics';

interface Props {
  title: string;
  setMode: (name: string) => void;
  options: IMetricSettings[],
  currentMode: IMetricSettings | undefined,
}

export default function MetricModeDropdown({
  title, setMode, options: metricOptions, currentMode,
}: Props) {
  const options = metricOptions.map((m) => ({
    id: m.name,
    name: m.name,
  }));

  return (
    <div>
      <Dropdown title={title} className="w-100">
        <Dropdown.Toggle className="w-100">{currentMode?.name}</Dropdown.Toggle>
        <Dropdown.Menu className="overflow-x-hidden overflow-y-scroll" style={{ maxHeight: '20rem' }}>
          {options.map((o) => (
            <Dropdown.Item
              key={o.id}
              onClick={() => setMode(o.id)}
              active={o.id === currentMode?.name}
            >
              {o.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {currentMode?.context === 'visualization' && (
        <Alert className="fst-italic mt-2 p-2" variant="warning" style={{ fontSize: '0.85rem' }}>
          <FontAwesomeIcon icon={faTriangleExclamation} className="me-1" />
          This metric is calculated within context of the visualization, so changing the
          visualization settings might change the metric results.
        </Alert>
      )}
      {currentMode?.description && (
      <Alert className="fst-italic mt-2 p-2" variant="primary" style={{ fontSize: '0.85rem' }}>
        <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
        {currentMode.description}
      </Alert>
      )}
    </div>
  );
}
