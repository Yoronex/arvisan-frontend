import { useContext } from 'react';
import { ViolationsContext } from '../../../context';
import ViolationsGroup from './group';
import { LayerViolation } from '../../../api';
import ViolationsList from './ViolationList';
import SubLayerViolationsModal from './SubLayerViolationsModal';
import { VisibilityOptions } from '../../../helpers/enums';

export default function SubLayerViolations() {
  const { violations, visibility, setVisibility } = useContext(ViolationsContext);
  const { subLayers } = violations;

  const showViolations = (newVal: VisibilityOptions) => {
    setVisibility({
      ...visibility,
      subLayers: newVal,
    });
  };

  const subLayerGroups = subLayers
    .reduce((g: ViolationsGroup<LayerViolation>[], l) => {
      const index = g.findIndex((c2) => c2.label === l.sourceNode?.label);
      if (index >= 0) {
        g[index].items.push(l);
      } else {
        g.push({
          items: [l],
          label: l.sourceNode?.label || '',
        });
      }
      return g;
    }, []);

  return (
    <ViolationsList
      checkboxId="sublayer-violations-checkbox"
      groups={subLayerGroups}
      header="Sublayer violations"
      Modal={SubLayerViolationsModal}
      showInVisualization={visibility.subLayers}
      setShowInVisualization={showViolations}
    />
  );
}
