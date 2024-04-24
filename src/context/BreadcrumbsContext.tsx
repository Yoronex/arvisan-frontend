import {
  createContext, PropsWithChildren, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  Breadcrumb, Domain, GraphService,
} from '../api';
import { VisualizationHistory } from './VisualizationHistory';
import { LayerContext } from './LayerContext';
import { GraphSettingsContext } from './GraphSettingsContext';

interface IBreadcrumbsContext {
  domains: Domain[];
  breadcrumbs: Breadcrumb[];
  currentDomain: Breadcrumb | null;
  loading: boolean;
}

export const BreadcrumbsContext = createContext<IBreadcrumbsContext>({
  domains: [],
  breadcrumbs: [],
  currentDomain: null,
  loading: true,
});

export default function BreadcrumbsContextProvider({ children }: PropsWithChildren) {
  const [currentDomain, setCurrentDomain] = useState<Breadcrumb | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [domainsLoading, setDomainsLoading] = useState(true);
  const [breadcrumbsLoading, setBreadcrumbsLoading] = useState(false);

  const { layers } = useContext(LayerContext);
  const { currentNode, currentNodeId } = useContext(VisualizationHistory);
  const { settings } = useContext(GraphSettingsContext);

  useEffect(() => {
    GraphService.getDomains()
      .then((d) => {
        setDomains(d);
      })
      .catch((e) => console.error(e))
      .finally(() => setDomainsLoading(false));
  }, []);

  useEffect(() => {
    if (!currentNode || !currentNodeId || !layers) return;

    setBreadcrumbsLoading(true);
    GraphService.getBreadcrumbOptions({ id: currentNodeId, layerDepth: settings.layerDepth })
      .then((b) => {
        const topLayer = b.shift();
        if (topLayer) {
          setCurrentDomain(topLayer);
        }
        setBreadcrumbs(b);
      })
      .catch((e) => console.error(e))
      .finally(() => setBreadcrumbsLoading(false));
  }, [currentDomain?.id, currentNode, currentNodeId, layers, settings.layerDepth]);

  const domainContext = useMemo((): IBreadcrumbsContext => ({
    domains,
    breadcrumbs,
    currentDomain,
    loading: domainsLoading || breadcrumbsLoading,
  }), [domains, breadcrumbs, currentDomain, domainsLoading, breadcrumbsLoading]);

  return (
    <BreadcrumbsContext.Provider value={domainContext}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}
