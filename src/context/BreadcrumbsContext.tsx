import {
  createContext, PropsWithChildren, useContext, useEffect, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import {
  Breadcrumb, Domain, GraphService, NodeData,
} from '../api';
import { VisualizationHistory } from './VisualizationHistory';
import { LayerContext } from './LayerContext';
import { GraphSettingsContext } from './GraphSettingsContext';

interface IBreadcrumbsContext {
  domains: Domain[];
  breadcrumbs: Breadcrumb[];
  currentDomain: NodeData | null;
  loading: boolean;
}

export const BreadcrumbsContext = createContext<IBreadcrumbsContext>({
  domains: [],
  breadcrumbs: [],
  currentDomain: null,
  loading: true,
});

export default function BreadcrumbsContextProvider({ children }: PropsWithChildren) {
  const [currentDomain, setCurrentDomain] = useState<NodeData | null>(null);
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

    const getDomain = (node: cytoscape.NodeSingular): NodeData => {
      if (node.isOrphan()) return node.data() as NodeData;
      const parent = node.parent();
      return getDomain(parent.first());
    };

    const updateDomain = (newDomain: NodeData) => {
      if (newDomain.id === currentDomain?.id) return;
      setCurrentDomain(newDomain);
    };

    const topLayer = layers.find((l) => l.parentLabel == null);

    if (currentNode.type === 'cytoscape') {
      const domain = getDomain(currentNode.data);
      updateDomain(domain);
    } else if (currentNode.type === 'backend' && currentNode.data.properties.layer === topLayer?.label) {
      updateDomain(currentNode.data);
    }

    setBreadcrumbsLoading(true);
    GraphService.getBreadcrumbOptions({ id: currentNodeId, layerDepth: settings.layerDepth })
      .then((b) => setBreadcrumbs(b))
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
