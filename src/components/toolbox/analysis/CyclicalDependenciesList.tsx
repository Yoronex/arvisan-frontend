import { useContext, useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { GraphContext, ViolationsContext } from '../../../context';
import CyclicalDependenciesModal from './CyclicalDependenciesModal';
import { DependencyCycleRender } from '../../../api';

export interface DependencyCycleGroup {
  cycles: DependencyCycleRender[];
  label: string;
}

interface Props {
  dependencyCycles: DependencyCycleGroup[];
}

export default function CyclicalDependenciesList({ dependencyCycles }: Props) {
  const { violations } = useContext(ViolationsContext);
  const { graph } = useContext(GraphContext);

  const [selectedDepCyclesIndex, setSelectedDepCyclesIndex] = useState<number | undefined>();
  const selectedDepCycles = selectedDepCyclesIndex !== undefined
    ? dependencyCycles[selectedDepCyclesIndex] : undefined;

  const cyclicalDepVisible = (group: DependencyCycleGroup) => group.cycles.some((c) => {
    const edges = c.path;
    return edges.every((e1) => graph.edges.find((e2) => e2.data.id.includes(e1.id)));
  });

  useEffect(() => {
    setSelectedDepCyclesIndex(undefined);
  }, [violations]);

  return (
    <div>
      <h4>(Indirect) cyclical dependencies</h4>
      <ListGroup>
        {dependencyCycles.map((d, index: number) => {
          const depVisible = cyclicalDepVisible(d);
          return (
            <ListGroupItem
              action
              key={d.label}
              className="d-flex justify-content-between align-items-center flex-nowrap"
              title={d.label}
              active={index === selectedDepCyclesIndex}
              onClick={() => setSelectedDepCyclesIndex(index)}
            >
              <div
                className="text-truncate"
                style={{ color: !depVisible ? 'darkgray' : undefined }}
              >
                {d.label}
              </div>
              <FontAwesomeIcon className="ms-2" icon={faArrowUpRightFromSquare} />
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <CyclicalDependenciesModal
        cyclicalDependencies={selectedDepCycles?.cycles}
        onClose={() => setSelectedDepCyclesIndex(undefined)}
        label={selectedDepCycles?.label}
      />
    </div>
  );
}
