import {
  createContext, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import { GraphLayer, GraphService } from '../api';

interface ILayerContext {
  layers: GraphLayer[];
  loading: boolean;
}

export const LayerContext = createContext<ILayerContext>({
  layers: [],
  loading: true,
});

export default function LayerContextProvider({ children }: PropsWithChildren) {
  const [layers, setLayers] = useState<GraphLayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GraphService.getLayers()
      .then((l) => {
        setLayers(l);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const layerContext = useMemo((): ILayerContext => ({
    layers,
    loading,
  }), [layers, loading]);

  return (
    <LayerContext.Provider value={layerContext}>
      {children}
    </LayerContext.Provider>
  );
}
