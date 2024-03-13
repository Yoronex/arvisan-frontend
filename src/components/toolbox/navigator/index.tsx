import NodeFinder from './NodeFinder';
import GraphHistory from './GraphHistory';

export default function ToolboxNavigation() {
  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <h5>Find node in visualization</h5>
        <div className="d-flex flex-column gap-3">
          <NodeFinder />
        </div>
      </div>
      <hr />
      <GraphHistory />
    </div>
  );
}
