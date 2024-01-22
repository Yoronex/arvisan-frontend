import React, { createContext, PropsWithChildren } from 'react';
import { Client, Graph } from '../api/Client';

interface IVisualizationSettings {
  showDependencies: boolean;
  minDependencies: number;
  maxDependencies: number;
  showDependents: boolean;
  minDependents: number;
  maxDependents: number;
  showInternalRelationships: boolean;
  showExternalRelationships: boolean;
}

interface IVisualizationContext {
  settings: IVisualizationSettings,
  updateSettings: (settings: IVisualizationSettings) => void;
  graph: Graph;
  loading: boolean;
}

const defaultSettings: IVisualizationSettings = {
  showDependencies: true,
  minDependencies: 0,
  maxDependencies: Number.POSITIVE_INFINITY,
  showDependents: false,
  minDependents: 0,
  maxDependents: Number.POSITIVE_INFINITY,
  showInternalRelationships: true,
  showExternalRelationships: true,
};

const defaultGraph: Graph = new Graph({ name: '', nodes: [], edges: [] });

export const VisualizationContext = createContext<IVisualizationContext>({
  settings: defaultSettings,
  graph: defaultGraph,
  updateSettings: () => {},
  loading: true,
});

interface Props extends PropsWithChildren {}

export default function VisualizationContextProvider({ children }: Props) {
  const [settings, setSettings] = React.useState(defaultSettings);
  const [graph, setGraph] = React.useState(defaultGraph);
  const [loading, setLoading] = React.useState(true);

  // Fetch initial graph
  React.useEffect(() => {
    new Client().getAllDomains()
      .then((g) => setGraph(g))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const updateSettings = (newSettings: IVisualizationSettings) => {
    setSettings(newSettings);
  };

  const visualizationContext = React.useMemo((): IVisualizationContext => ({
    settings,
    graph,
    updateSettings,
    loading,
  }), [settings, graph, loading]);

  return (
    <VisualizationContext.Provider value={visualizationContext}>
      {children}
    </VisualizationContext.Provider>
  );
}
