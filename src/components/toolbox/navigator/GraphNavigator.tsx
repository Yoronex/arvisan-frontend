import DomainSelector from './DomainSelector';
import NodeFinder from './NodeFinder';

export default function GraphNavigator() {
  return (
    <div className="d-flex flex-column gap-3">
      <DomainSelector />
      <NodeFinder />
    </div>
  );
}
