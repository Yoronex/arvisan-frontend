import NodeFinderVisualization from './NodeFinderVisualization';
import GraphHistory from './GraphHistory';
import NodeFinderDatabase from './NodeFinderDatabase';

export default function ToolboxNavigation() {
  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <h5>Show node in visualization</h5>
        <div className="d-flex flex-column gap-3">
          <NodeFinderVisualization />
        </div>
      </div>
      <div>
        <h5>Find & select node from database</h5>
        <div className="d-flex flex-column gap-3">
          <NodeFinderDatabase />
        </div>
      </div>
      <hr />
      <GraphHistory />
    </div>
  );
}
