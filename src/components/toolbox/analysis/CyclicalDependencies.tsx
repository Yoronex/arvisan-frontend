import { useContext, useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { GraphContext, ViolationsContext } from '../../../context';
import CyclicalDependenciesModal from './CyclicalDependenciesModal';
import { DependencyCycle } from '../../../api';
import CyclicalDependenciesList, { DependencyCycleGroup } from './CyclicalDependenciesList';

export default function CyclicalDependencies() {
  const { violations } = useContext(ViolationsContext);
  const { dependencyCycles } = violations;

  const dependencyCycleGroups = dependencyCycles.reduce((g: DependencyCycleGroup[], c) => {
    const index = g.findIndex((c2) => c2.label === c.node.label);
    if (index >= 0) {
      g[index].cycles.push(c);
    } else {
      g.push({
        cycles: [c],
        label: c.node.label,
      });
    }
    return g;
  }, []);

  return (
    <CyclicalDependenciesList dependencyCycles={dependencyCycleGroups} />
  );
}
