import {
  createContext, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import { GraphService, NodeData } from '../api';

interface DomainData extends NodeData {
  nrDependencies: number;
  nrDependents: number;
  nrSelfEdges: number;
}

interface IDomainContext {
  domains: DomainData[];
  currentDomain: NodeData | null;
  updateDomain: (d: NodeData) => void;
  loading: boolean;
}

export const DomainContext = createContext<IDomainContext>({
  domains: [],
  currentDomain: null,
  updateDomain: () => {},
  loading: true,
});

export default function DomainContextProvider({ children }: PropsWithChildren) {
  const [currentDomain, setCurrentDomain] = useState<NodeData | null>(null);
  const [domains, setDomains] = useState<DomainData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GraphService.getAllDomains()
      .then((graph) => {
        const { nodes, edges } = graph;
        const domainNodes = nodes
          .map((n): DomainData => ({
            ...n.data,
            label: n.data.label.substring(2),
            nrDependencies: edges
              .filter((e) => e.data.source === n.data.id && e.data.target !== n.data.id)
              .reduce((total, e) => total + e.data.properties.weight, 0),
            nrDependents: edges
              .filter((e) => e.data.source !== n.data.id && e.data.target === n.data.id)
              .reduce((total, e) => total + e.data.properties.weight, 0),
            nrSelfEdges: edges
              .filter((e) => e.data.source === n.data.id && e.data.target === n.data.id)
              .reduce((total, e) => total + e.data.properties.weight, 0),
          }))
          .sort((a, b) => {
            if (a.label < b.label) return -1;
            if (a.label > b.label) return 1;
            return 0;
          });
        setDomains(domainNodes);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const domainContext = useMemo((): IDomainContext => {
    const updateDomain = (newDomain: NodeData) => {
      if (newDomain.id === currentDomain?.id) return;
      setCurrentDomain(newDomain);
    };
    return {
      domains,
      currentDomain,
      updateDomain,
      loading,
    };
  }, [domains, currentDomain, loading]);

  return (
    <DomainContext.Provider value={domainContext}>
      {children}
    </DomainContext.Provider>
  );
}
