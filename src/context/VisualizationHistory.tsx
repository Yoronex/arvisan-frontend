import React, {
  createContext, PropsWithChildren, useContext, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import { NodeData } from '../api';
import { LayerContext } from './LayerContext';

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
  currentNodeDepth: number;

  history: HistoryNode[];
  historyStackPosition: number;
}

export const VisualizationHistory = createContext<IVisualizationHistory>({
  back: () => {},
  canGoBack: () => false,
  visitNode: () => {},
  currentNode: undefined,
  currentNodeId: undefined,
  currentNodeDepth: 0,
  history: [],
  historyStackPosition: 0,
});

export default function VisualizationHistoryProvider({ children }: PropsWithChildren) {
  const { layers } = useContext(LayerContext);

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

    let currentNodeDepth = 0;
    let layer: string | undefined;
    if (currentNode?.type === 'cytoscape') {
      layer = currentNode.data.data('properties.layer') as string;
    } else if (currentNode?.type === 'backend') {
      layer = currentNode.data.properties.layer;
    }
    if (layer !== undefined) {
      currentNodeDepth = layers.findIndex((l) => layer!.includes(l.label));
    }

    return {
      visitNode,
      canGoBack,
      back,
      currentNode,
      currentNodeId,
      currentNodeDepth,
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
