import { Dropdown } from 'react-bootstrap';
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
  );
}
