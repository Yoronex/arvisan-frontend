import { useContext } from 'react';
import { ColoringContext } from '../../../context/ColoringContext';
import { ColoringModeOptions } from '../../../helpers/color';

export default function ColoringModeGradient() {
  const { mode } = useContext(ColoringContext);

  const colors = ColoringModeOptions.get(mode)?.hexColors;

  let gradient: string;
  if (colors !== undefined && colors.length >= 2) {
    const gradientSteps = colors.map((c, index, all) => (
      `${c} ${Math.round((index / (all.length - 1)) * 100)}%`
    )).join(', ');
    gradient = `linear-gradient(90deg, ${gradientSteps})`;
  } else if (colors !== undefined && colors.length >= 1) {
    [gradient] = colors;
  } else {
    gradient = 'grey';
  }

  return (
    <div className="w-100">
      <div className="w-100" style={{ height: '0.5rem', background: gradient }} />
      <div className="d-flex justify-content-between">
        {colors === undefined || colors.length === 0 ? (
          <div className="fst-italic">
            No gradient defined for this mode.
          </div>
        ) : (
          <>
            <div>0</div>
            <div>1</div>
          </>
        )}
      </div>
    </div>
  );
}
