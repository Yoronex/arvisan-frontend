import {
  createContext, PropsWithChildren, useContext, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import { VisualizationContext } from './VisualizationContext';

interface IVisualizationHistory {
  back: () => void;
  canGoBack: () => boolean;
  visitNode: (node: cytoscape.NodeSingular) => void;
}

export const VisualizationHistory = createContext<IVisualizationHistory>({
  back: () => {},
  canGoBack: () => false,
  visitNode: () => {},
});

export default function VisualizationHistoryProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<cytoscape.NodeSingular[]>([]);

  const { selectNode, selectedNode } = useContext(VisualizationContext);

  const visitNode = (node: cytoscape.NodeSingular) => {
    if (selectedNode) {
      const historyCopy = [...history];
      historyCopy.unshift(selectedNode);
      setHistory(historyCopy);
    }

    selectNode(node);
  };

  const canGoBack = () => history.length > 0;

  const back = () => {
    if (history.length === 0) return;
    const historyCopy = [...history];
    const node = historyCopy.shift();
    setHistory(historyCopy);

    selectNode(node!);
  };

  const historyContext = useMemo(() => ({
    visitNode,
    canGoBack,
    back,
  }), [back, canGoBack, visitNode]);

  return (
    <VisualizationHistory.Provider value={historyContext}>
      {children}
    </VisualizationHistory.Provider>
  );
}
