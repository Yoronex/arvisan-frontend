import { ICategoryColoring } from '../../../helpers/color';
import ColorBox from '../../ColorBox';

interface Props {
  coloring: ICategoryColoring;
}

export default function ColoringModeCategories({ coloring }: Props) {
  if (coloring.legend.size === 0) {
    return (
      <div className="w-100 fst-italic small">
        Colors set dynamically.
      </div>
    );
  }

  const colors = [...coloring.legend.keys()];

  return (
    <div className="w-100 d-flex flex-column">
      {colors.map((key) => (
        <div key={key} className="d-flex flex-row gap-1 align-items-center">
          <ColorBox color={key} />
          <div>{coloring.legend.get(key)}</div>
        </div>
      ))}
    </div>
  );
}
