import cytoscape from 'cytoscape';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import HoverDetailsNode from '../hover/HoverDetailsNode';
import { ViolationsContext, VisualizationHistory } from '../../../context';
import CyclicalDependenciesDetails from '../../toolbox/analysis/CyclicalDependenciesDetails';
import SubLayerViolationsDetails from '../../toolbox/analysis/SubLayerViolationsDetails';

interface Props {
  node: cytoscape.NodeSingular
  onClose: () => void;
}

export default function GraphElementDetailsNode({ node, onClose }: Props) {
  const { violations } = useContext(ViolationsContext);
  const { visitNode } = useContext(VisualizationHistory);

  const cyclicalDeps = violations.dependencyCycles
    .filter((v) => v.node.id === node.id());
  const subLayerViolations = violations.subLayers
    .filter((v) => v.target === node.id() || v.source === node.id());

  const handleVisitNode = () => {
    visitNode({
      type: 'cytoscape',
      timestamp: new Date(),
      data: node,
    });
    onClose();
  };

  return (
    <div className="d-flex flex-column gap-5">
      <HoverDetailsNode node={node} />
      <Button onClick={handleVisitNode}>Select this node</Button>
      <div className="w-100">
        <h3>Cyclical dependencies</h3>
        <CyclicalDependenciesDetails cyclicalDependencies={cyclicalDeps} onHighlight={onClose} />
      </div>
      <div>
        <h3>Sublayer violations</h3>
        <SubLayerViolationsDetails violations={subLayerViolations} onHighlight={onClose} />
      </div>
    </div>
  );
}
