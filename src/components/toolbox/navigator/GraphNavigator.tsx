import DomainSelector from './DomainSelector';
import NodeFinder from './NodeFinder';
import GraphHistory from './GraphHistory';
import CurrentNodeStack from './CurrentNodeStack';

export default function GraphNavigator() {
  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <h5>Domain & Node Selectors</h5>
        <div className="d-flex flex-column gap-3">
          <DomainSelector />
          <NodeFinder />
        </div>
      </div>
      <hr />
      <CurrentNodeStack />
      <hr />
      <GraphHistory />
    </div>
  );
}
