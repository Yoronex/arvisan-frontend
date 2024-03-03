import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ColoringContext } from '../../../context/ColoringContext';
import { ColoringModeOptions } from '../../../helpers/color';

export default function ColoringModeDropdown() {
  const { mode, setMode } = useContext(ColoringContext);

  const options = Array.from(ColoringModeOptions.keys()).map((m) => ({
    id: m,
    name: ColoringModeOptions.get(m)?.name ?? '',
  }));

  const currentMode = ColoringModeOptions.get(mode);

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
