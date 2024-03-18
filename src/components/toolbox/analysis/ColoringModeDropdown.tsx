import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ColoringContext } from '../../../context';

export default function ColoringModeDropdown() {
  const { setMode, options: coloringOptions, currentMode } = useContext(ColoringContext);

  const options = coloringOptions.map((m) => ({
    id: m.name,
    name: m.name,
  }));

  return (
    <Dropdown title="Choose coloring mode" className="w-100">
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
