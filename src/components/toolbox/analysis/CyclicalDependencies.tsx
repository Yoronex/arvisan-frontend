import { useContext } from 'react';
import { GraphContext, ViolationsContext } from '../../../context';
import ViolationsGroup from './group';
import { DependencyCycleRender } from '../../../api';
import ViolationsList from './ViolationList';
import CyclicalDependenciesModal from './CyclicalDependenciesModal';

export default function CyclicalDependencies() {
  const { violations, visibility, setVisibility } = useContext(ViolationsContext);
  const { graph } = useContext(GraphContext);
  const { dependencyCycles } = violations;

  const showViolations = (newVal: boolean) => {
    setVisibility({
      ...visibility,
      dependencyCycles: newVal,
    });
  };

  const dependencyCycleGroups = dependencyCycles
    .reduce((g: ViolationsGroup<DependencyCycleRender>[], c) => {
      const index = g.findIndex((c2) => c2.label === c.node.label);
      if (index >= 0) {
        g[index].items.push(c);
      } else {
        g.push({
          items: [c],
          label: c.node.label,
        });
      }
      return g;
    }, []);

  const cyclicalDepGreyed = (
    group: ViolationsGroup<DependencyCycleRender>,
  ) => group.items
    .some((c) => c.path
      .some((e1) => !graph.edges
        .find((e2) => e2.data.id.includes(e1.id))));

  return (
    <ViolationsList
      groups={dependencyCycleGroups}
      groupGreyed={cyclicalDepGreyed}
      header="(Indirect) cyclical dependencies"
      Modal={CyclicalDependenciesModal}
      showInVisualization={visibility.dependencyCycles}
      setShowInVisualization={showViolations}
    />
  );
}
