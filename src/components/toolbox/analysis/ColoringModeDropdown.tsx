import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ColoringContext } from '../../../context';

export default function ColoringModeDropdown() {
  const { mode, setMode, options: coloringOptions } = useContext(ColoringContext);

  const options = Array.from(coloringOptions.keys()).map((m) => ({
    id: m,
    name: coloringOptions.get(m)?.name ?? '',
  }));

  const currentMode = coloringOptions.get(mode);

  return (
    <Dropdown title="Choose coloring mode" className="w-100">
      <Dropdown.Toggle className="w-100">{currentMode?.name}</Dropdown.Toggle>
      <Dropdown.Menu className="overflow-x-hidden overflow-y-scroll" style={{ maxHeight: '20rem' }}>
        {options.map((o) => (
          <Dropdown.Item
            key={o.id}
            onClick={() => setMode(o.id)}
            active={o.id === mode}
          >
            {o.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
