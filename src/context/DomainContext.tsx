import {
  createContext, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import { Domain, GraphService, NodeData } from '../api';

interface IDomainContext {
  domains: Domain[];
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
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GraphService.getDomains()
      .then((d) => {
        setDomains(d);
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
