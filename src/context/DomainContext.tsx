import {
  createContext, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import { GraphService, NodeData } from '../api';

interface IDomainContext {
  domains: NodeData[];
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
  const [domains, setDomains] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GraphService.getAllDomains()
      .then((graph) => setDomains(graph.nodes
        .map((n) => ({
          ...n.data,
          label: n.data.label.substring(2),
        }))
        .sort((a, b) => {
          if (a.label < b.label) return -1;
          if (a.label > b.label) return 1;
          return 0;
        })))
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
