import React, { createContext, PropsWithChildren, SetStateAction } from 'react';
import { Graph, GraphService } from '../api';
import { VisualizationHistory } from './VisualizationHistory';
import { ViolationsContext } from './ViolationsContext';

interface IGraphFilterSettings {
  layerDepth: number,
  dependencyLength: number,
  showOutgoing: boolean;
  minOutgoing: number;
  maxOutgoing: number;
  showIncoming: boolean;
  minIncoming: number;
  maxIncoming: number;
  showSelectionInternalRelationships: boolean;
  showDomainInternalRelationships: boolean;
  showExternalRelationships: boolean;
  selfEdges: boolean;
  showWeakDependencies: boolean;
  showStrongDependencies: boolean;
  showEntityDependencies: boolean;
}

interface IGraphSettings {
  settings: IGraphFilterSettings,
  updateSettings: (settings: SetStateAction<IGraphFilterSettings>) => void;
  resetSettings: () => void;
  graph: Graph;
  loading: boolean;

  enableMovingNodes: boolean;
  setEnableMovingNodes: (enable: boolean) => void;
}

const defaultSettings: IGraphFilterSettings = {
  layerDepth: 1,
  dependencyLength: 1,
  showOutgoing: true,
  minOutgoing: 0,
  maxOutgoing: Number.POSITIVE_INFINITY,
  showIncoming: false,
  minIncoming: 0,
  maxIncoming: Number.POSITIVE_INFINITY,
  showSelectionInternalRelationships: true,
  showDomainInternalRelationships: true,
  showExternalRelationships: true,
  selfEdges: true,
  showWeakDependencies: true,
  showStrongDependencies: true,
  showEntityDependencies: true,
};

const defaultGraph: Graph = { name: '', nodes: [], edges: [] };

export const GraphContext = createContext<IGraphSettings>({
  settings: defaultSettings,
  graph: defaultGraph,
  updateSettings: () => {},
  resetSettings: () => {},
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

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

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
  }, [currentNodeId, settings]);

  const updateSettings = (newSettings: SetStateAction<IGraphFilterSettings>) => {
    setSettings(newSettings);
  };

  const visualizationContext = React.useMemo((): IGraphSettings => ({
    settings,
    graph,
    updateSettings,
    resetSettings,
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
