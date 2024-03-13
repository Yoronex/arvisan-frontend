import React, {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import { NodeData } from '../api';

export type CytoscapeNode = {
  type: 'cytoscape',
  data: cytoscape.NodeSingular;
  timestamp: Date;
};

export type BackendNode = {
  type: 'backend',
  data: NodeData,
  timestamp: Date;
};

export type HistoryNode = CytoscapeNode | BackendNode;

interface IVisualizationHistory {
  back: (steps?: number) => void;
  canGoBack: (steps?: number) => boolean;
  visitNode: (node: HistoryNode) => void;

  currentNode?: HistoryNode;
  currentNodeId?: string;

  history: HistoryNode[];
  historyStackPosition: number;
}

export const VisualizationHistory = createContext<IVisualizationHistory>({
  back: () => {},
  canGoBack: () => false,
  visitNode: () => {},
  currentNode: undefined,
  currentNodeId: undefined,
  history: [],
  historyStackPosition: 0,
});

export default function VisualizationHistoryProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<HistoryNode[]>([]);
  const [historyStackPosition, setHistoryStackPosition] = useState(0);
  const [currentNode, setCurrentNode] = React.useState<HistoryNode | undefined>();

  let currentNodeId: string | undefined;
  if (currentNode) {
    switch (currentNode.type) {
      case 'cytoscape':
        currentNodeId = currentNode.data.id();
        break;
      case 'backend':
        currentNodeId = currentNode.data.id;
        break;
      default: currentNodeId = undefined;
    }
  }

  const historyContext = useMemo((): IVisualizationHistory => {
    const visitNode = (node: HistoryNode) => {
      const nodeId = node.type === 'cytoscape' ? node.data.id() : node.data.id;
      if (nodeId === currentNodeId) return;

      const historyCopy = [...history];
      // If the stack pointer is not on top of the stack,
      // delete elements till you reach the pointer.
      historyCopy.splice(0, historyStackPosition);
      historyCopy.unshift(node);
      setHistory(historyCopy);
      setHistoryStackPosition(0);

      setCurrentNode(node);
    };

    const canGoBack = (steps: number = 1) => (historyStackPosition + steps < history.length);

    const back = (steps: number = 1) => {
      // Stack not large enough, so return
      if (!canGoBack(steps)) return;

      const newStackPosition = historyStackPosition + steps;
      const node = history[newStackPosition];
      setHistoryStackPosition(newStackPosition);

      setCurrentNode(node);
    };

    return {
      visitNode,
      canGoBack,
      back,
      currentNode,
      currentNodeId,
      history,
      historyStackPosition,
    };
  }, [currentNode, currentNodeId, history, historyStackPosition]);

  return (
    <VisualizationHistory.Provider value={historyContext}>
      {children}
    </VisualizationHistory.Provider>
  );
}
