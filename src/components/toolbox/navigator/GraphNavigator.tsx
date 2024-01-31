import DomainSelector from './DomainSelector';
import NodeFinder from './NodeFinder';
import GraphHistory from './GraphHistory';
import CurrentNodeStack from './CurrentNodeStack';

export default function GraphNavigator() {
  return (
    <div className="d-flex flex-column gap-3">
      <DomainSelector />
      <NodeFinder />
      <hr />
      <CurrentNodeStack />
      <hr />
      <GraphHistory />
    </div>
  );
}
