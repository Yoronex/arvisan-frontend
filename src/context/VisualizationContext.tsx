import React, { createContext, PropsWithChildren } from 'react';
import cytoscape from 'cytoscape';
import { Graph, GraphService } from '../api';

interface IVisualizationSettings {
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

interface IVisualizationContext {
  settings: IVisualizationSettings,
  updateSettings: (settings: IVisualizationSettings) => void;
  graph: Graph;
  loading: boolean;

  selectedNode: cytoscape.NodeSingular | undefined;
  selectNode: (n: cytoscape.NodeSingular) => void;
  returnToOverview: () => void;
}

const defaultSettings: IVisualizationSettings = {
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

export const VisualizationContext = createContext<IVisualizationContext>({
  settings: defaultSettings,
  graph: defaultGraph,
  updateSettings: () => {},
  loading: true,
  selectedNode: undefined,
  selectNode: () => {},
  returnToOverview: () => {},
});

interface Props extends PropsWithChildren {}

export default function VisualizationContextProvider({ children }: Props) {
  const [settings, setSettings] = React.useState(defaultSettings);
  const [graph, setGraph] = React.useState(defaultGraph);
  const [loading, setLoading] = React.useState(true);
  const [selectedNode, setSelectedNode] = React.useState<cytoscape.NodeSingular | undefined>();

  const getDomainOverview = async () => {
    setLoading(true);
    const g = await GraphService.getAllDomains();
    setGraph(g);
    setLoading(false);
    return g;
  };

  const getSelectedNodeGraph = async () => {
    if (!selectedNode) return;
    setLoading(true);

    const onlyInternalRelations = !settings.showExternalRelationships;
    const onlyExternalRelations = !settings.showInternalRelationships;

    const g = await GraphService.getNode({
      id: selectedNode.id(),
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

    setGraph(g as Graph);
    setLoading(false);
  };

  // Fetch initial graph
  React.useEffect(() => {
    getDomainOverview()
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // Reload graph when selecting a node
  React.useEffect(() => {
    if (!selectedNode) return;

    getSelectedNodeGraph()
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [selectedNode, settings]);

  const updateSettings = (newSettings: IVisualizationSettings) => {
    setSettings(newSettings);
  };

  const selectNode = (node: cytoscape.NodeSingular) => {
    setSelectedNode(node);
  };

  const returnToOverview = () => {
    setSelectedNode(undefined);
    getDomainOverview()
      .catch((e) => console.error(e));
  };

  const visualizationContext = React.useMemo((): IVisualizationContext => ({
    settings,
    graph,
    updateSettings,
    loading,
    selectedNode,
    selectNode,
    returnToOverview,
  }), [settings, graph, loading]);

  return (
    <VisualizationContext.Provider value={visualizationContext}>
      {children}
    </VisualizationContext.Provider>
  );
}
