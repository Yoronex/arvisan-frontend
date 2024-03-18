import React, {
  createContext, PropsWithChildren, useCallback,
} from 'react';
import { Graph, GraphService, NodeData } from '../api';
import { VisualizationHistory } from './VisualizationHistory';
import { ViolationsContext } from './ViolationsContext';
import { GraphSettingsContext } from './GraphSettingsContext';

interface IGraphSettings {
  graph: Graph;
  getParents: (parent: NodeData) => NodeData[],
  loading: boolean;

  enableMovingNodes: boolean;
  setEnableMovingNodes: (enable: boolean) => void;
}

const defaultGraph: Graph = { name: '', nodes: [], edges: [] };

export const GraphContext = createContext<IGraphSettings>({
  graph: defaultGraph,
  getParents: () => [],
  loading: true,
  enableMovingNodes: false,
  setEnableMovingNodes: () => {},
});

interface Props extends PropsWithChildren {}

export default function GraphContextProvider({ children }: Props) {
  const [graph, setGraph] = React.useState(defaultGraph);
  const [loading, setLoading] = React.useState(true);
  const [enableMovingNodes, setEnableMovingNodes] = React.useState(false);

  const { settings } = React.useContext(GraphSettingsContext);
  const { currentNodeId } = React.useContext(VisualizationHistory);
  const { setViolations } = React.useContext(ViolationsContext);

  // Reload graph when selecting a node
  React.useEffect(() => {
    const getSelectedNodeGraph = async () => {
      if (!currentNodeId) return;
      setLoading(true);

      const { graph: g, violations } = await GraphService.getNode({
        id: currentNodeId,
        layerDepth: settings.layerDepth,
        dependencyDepth: settings.dependencyLength,
        showSelectedInternalRelations: settings.showSelectionInternalRelationships,
        showDomainInternalRelations: settings.showDomainInternalRelationships,
        showExternalRelations: settings.showExternalRelationships,
        showOutgoing: settings.showOutgoing,
        showIncoming: settings.showIncoming,
        outgoingRange: {
          min: settings.minOutgoing || undefined,
          max: settings.maxOutgoing === Number.POSITIVE_INFINITY
            ? undefined : settings.maxOutgoing,
        },
        incomingRange: {
          min: settings.minIncoming || undefined,
          max: settings.maxIncoming === Number.POSITIVE_INFINITY
            ? undefined : settings.maxIncoming,
        },
        selfEdges: settings.selfEdges,
        showWeakDependencies: settings.showWeakDependencies,
        showStrongDependencies: settings.showStrongDependencies,
        showEntityDependencies: settings.showEntityDependencies,
      });

      // Cytoscape has issues with removing and adding edges when changing the layer depth. This is
      // because the edge ID does not change when changing the layer depth, but the source and
      // target nodes do. Unfortunately, I was unable to reproduce the issue with a smaller graph
      // (24-01-2024). So to force adding these completely different edges, we have to make sure the
      // ID does not exist. If you enable this, a random number will be added to the edge ID to make
      // sure all edges are new on a rerender.
      g.edges.forEach((e) => {
        e.data.id = `${e.data.id}--${Math.round((Math.random() * 10e12))}`;
      });

      setGraph(g);
      setViolations(violations);
      setLoading(false);
    };

    if (!currentNodeId) return;

    getSelectedNodeGraph()
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [currentNodeId, setViolations, settings]);

  const getParents = useCallback((node: NodeData): NodeData[] => {
    if (node.parent === undefined) return [];
    const parent = graph.nodes.find((n) => n.data.id === node.parent);
    if (!parent) return [];
    return [parent.data, ...getParents(parent.data)];
  }, [graph]);

  const visualizationContext = React.useMemo((): IGraphSettings => ({
    graph,
    getParents,
    loading,
    enableMovingNodes,
    setEnableMovingNodes,
  }), [graph, getParents, loading, enableMovingNodes]);

  return (
    <GraphContext.Provider value={visualizationContext}>
      {children}
    </GraphContext.Provider>
  );
}
