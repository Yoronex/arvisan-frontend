import ColorBox from '../../ColorBox';
import { ICategoryMetric } from '../../../helpers/metrics';

interface Props {
  coloring: ICategoryMetric;
}

export default function ColoringModeCategories({ coloring }: Props) {
  if (coloring.legend.size === 0) {
    return null;
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
