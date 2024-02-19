import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { EdgeData, NodeData } from '../api';

interface IGraphHighlightContext {
  nodes: NodeData[] | null;
  highlightNodes: (n: NodeData[]) => void;
  edges: EdgeData[] | null;
  highlightEdges: (e: EdgeData[]) => void;
  finish: () => void;
}

export const GraphHighlightContext = createContext<IGraphHighlightContext>({
  nodes: null,
  highlightNodes: () => {},
  edges: null,
  highlightEdges: () => {},
  finish: () => {},
});

export default function GraphHighlightContextProvider({ children }: PropsWithChildren) {
  const [nodes, setNodes] = useState<NodeData[] | null>(null);
  const [edges, setEdges] = useState<EdgeData[] | null>(null);

  const graphHighlightContext = useMemo((): IGraphHighlightContext => ({
    nodes,
    highlightNodes: setNodes,
    edges,
    highlightEdges: setEdges,
    finish: () => {
      setNodes(null);
      setEdges(null);
    },
  }), [nodes, edges]);

  return (
    <GraphHighlightContext.Provider value={graphHighlightContext}>
      {children}
    </GraphHighlightContext.Provider>
  );
}
