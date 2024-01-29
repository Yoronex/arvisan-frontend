import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { NodeData } from '../api';

interface INodeHighlightContext {
  node: NodeData | null;
  highlight: (n: NodeData) => void;
  finish: () => void;
}

export const NodeHighlightContext = createContext<INodeHighlightContext>({
  node: null,
  highlight: () => {},
  finish: () => {},
});

export default function NodeHighlightContextProvider({ children }: PropsWithChildren) {
  const [node, setNode] = useState<NodeData | null>(null);

  const nodeHighlightContext = useMemo((): INodeHighlightContext => ({
    node,
    highlight: setNode,
    finish: () => setNode(null),
  }), [node]);

  return (
    <NodeHighlightContext.Provider value={nodeHighlightContext}>
      {children}
    </NodeHighlightContext.Provider>
  );
}
