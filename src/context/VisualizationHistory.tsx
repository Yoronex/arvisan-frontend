import React, {
  createContext, PropsWithChildren, useContext, useMemo, useState,
} from 'react';
import { NodeData } from '../api';
import { DomainContext } from './DomainContext';

interface IVisualizationHistory {
  back: () => void;
  canGoBack: () => boolean;
  visitNode: (node: NodeData, domain: NodeData) => void;
  currentNode: NodeData | undefined;
}

export const VisualizationHistory = createContext<IVisualizationHistory>({
  back: () => {},
  canGoBack: () => false,
  visitNode: () => {},
  currentNode: undefined,
});

export default function VisualizationHistoryProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<NodeData[]>([]);
  const [currentNode, setCurrentNode] = React.useState<NodeData | undefined>();

  const { updateDomain } = useContext(DomainContext);

  const visitNode = (node: NodeData, domain: NodeData) => {
    if (currentNode) {
      const historyCopy = [...history];
      historyCopy.unshift(currentNode);
      setHistory(historyCopy);
    }

    updateDomain(domain);
    setCurrentNode(node);
  };

  const canGoBack = () => history.length > 0;

  const back = () => {
    if (history.length === 0) return;
    const historyCopy = [...history];
    const node = historyCopy.shift();
    setHistory(historyCopy);

    setCurrentNode(node);
  };

  const historyContext = useMemo((): IVisualizationHistory => ({
    visitNode,
    canGoBack,
    back,
    currentNode,
  }), [back, canGoBack, visitNode, currentNode]);

  return (
    <VisualizationHistory.Provider value={historyContext}>
      {children}
    </VisualizationHistory.Provider>
  );
}
