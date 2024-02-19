import React, { createContext, PropsWithChildren } from 'react';
import { Graph, GraphService } from '../api';
import { VisualizationHistory } from './VisualizationHistory';
import { ViolationsContext } from './ViolationsContext';

interface IGraphFilterSettings {
  layerDepth: number,
  dependencyLength: number,
  showDependencies: boolean;
  minDependencies: number;
  maxDependencies: number;
  showDependents: boolean;
  minDependents: number;
  maxDependents: number;
  showInternalRelationships: boolean;
  showExternalRelationships: boolean;
  selfEdges: boolean;
}

interface IGraphSettings {
  settings: IGraphFilterSettings,
  updateSettings: (settings: IGraphFilterSettings) => void;
  graph: Graph;
  loading: boolean;

  enableMovingNodes: boolean;
  setEnableMovingNodes: (enable: boolean) => void;
}

const defaultSettings: IGraphFilterSettings = {
  layerDepth: 1,
  dependencyLength: 1,
  showDependencies: true,
  minDependencies: 0,
  maxDependencies: Number.POSITIVE_INFINITY,
  showDependents: false,
  minDependents: 0,
  maxDependents: Number.POSITIVE_INFINITY,
  showInternalRelationships: true,
  showExternalRelationships: true,
  selfEdges: true,
};

const defaultGraph: Graph = { name: '', nodes: [], edges: [] };

export const GraphContext = createContext<IGraphSettings>({
  settings: defaultSettings,
  graph: defaultGraph,
  updateSettings: () => {},
  loading: true,
  enableMovingNodes: false,
  setEnableMovingNodes: () => {},
});

interface Props extends PropsWithChildren {}

export default function GraphContextProvider({ children }: Props) {
  const [settings, setSettings] = React.useState(defaultSettings);
  const [graph, setGraph] = React.useState(defaultGraph);
  const [loading, setLoading] = React.useState(true);
  const [enableMovingNodes, setEnableMovingNodes] = React.useState(false);

  const { currentNodeId } = React.useContext(VisualizationHistory);
  const { setViolations } = React.useContext(ViolationsContext);

  // Reload graph when selecting a node
  React.useEffect(() => {
    const getSelectedNodeGraph = async () => {
      if (!currentNodeId) return;
      setLoading(true);

      const onlyInternalRelations = !settings.showExternalRelationships;
      const onlyExternalRelations = !settings.showInternalRelationships;

      const { graph: g, violations } = await GraphService.getNode({
        id: currentNodeId,
        layerDepth: settings.layerDepth,
        dependencyDepth: settings.dependencyLength,
        onlyInternalRelations,
        onlyExternalRelations,
        showDependencies: settings.showDependencies,
        showDependents: settings.showDependents,
        dependencyRange: {
          min: settings.minDependencies || undefined,
          max: settings.maxDependencies === Number.POSITIVE_INFINITY
            ? undefined : settings.maxDependencies,
        },
        dependentRange: {
          min: settings.minDependents || undefined,
          max: settings.maxDependents === Number.POSITIVE_INFINITY
            ? undefined : settings.maxDependents,
        },
        selfEdges: settings.selfEdges,
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
  }, [currentNodeId, settings]);

  const updateSettings = (newSettings: IGraphFilterSettings) => {
    setSettings(newSettings);
  };

  const visualizationContext = React.useMemo((): IGraphSettings => ({
    settings,
    graph,
    updateSettings,
    loading,
    enableMovingNodes,
    setEnableMovingNodes,
  }), [settings, graph, loading, enableMovingNodes]);

  return (
    <GraphContext.Provider value={visualizationContext}>
      {children}
    </GraphContext.Provider>
  );
}