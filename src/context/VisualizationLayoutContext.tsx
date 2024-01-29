import {
  createContext, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import { KlayLayoutOptions } from 'cytoscape-klay';
import { ColaLayoutOptions } from '../../local-types/cytoscape-cola';

export enum VisualizationAlgorithm {
  GRID = 'grid',
  KLAY = 'klay',
  COLA = 'cola',
}

export type PossibleLayoutOptions = cytoscape.GridLayoutOptions | KlayLayoutOptions
| ColaLayoutOptions;

type IVisualizationLayoutContext = {
  algorithm: VisualizationAlgorithm,
  setAlgorithm: (a: VisualizationAlgorithm) => void;
  layoutOptions: PossibleLayoutOptions;
  reload: () => void;
  reloadedAt: Date;
};

const defaultAlgorithm: VisualizationAlgorithm = VisualizationAlgorithm.GRID;
const defaultLayoutOptions: PossibleLayoutOptions = {
  name: 'grid', nodeDimensionsIncludeLabels: true,
};

export const VisualizationLayoutContext = createContext<IVisualizationLayoutContext>({
  algorithm: defaultAlgorithm,
  setAlgorithm: () => {},
  layoutOptions: defaultLayoutOptions,
  reload: () => {},
  reloadedAt: new Date(),
});

export default function VisualizationLayoutContextProvider({ children }: PropsWithChildren) {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [layoutOptions, setLayoutOptions] = useState(defaultLayoutOptions);
  const [reloadedAt, setReloadedAt] = useState(new Date());

  const reload = () => {
    setReloadedAt(new Date());
  };

  const layoutContext = useMemo((): IVisualizationLayoutContext => ({
    algorithm,
    setAlgorithm,
    layoutOptions,
    reload,
    reloadedAt,
  }), [algorithm, layoutOptions, reloadedAt]);

  useEffect(() => {
    switch (algorithm) {
      case VisualizationAlgorithm.COLA:
        setLayoutOptions({
          name: 'cola',
          nodeDimensionsIncludeLabels: true,
        } as ColaLayoutOptions);
        break;
      case VisualizationAlgorithm.KLAY:
        setLayoutOptions({
          name: 'klay',
          nodeDimensionsIncludeLabels: true,
          animate: true,
          klay: {
            direction: 'DOWN',
            edgeRouting: 'ORTHOGONAL',
            routeSelfLoopInside: true,
            thoroughness: 4,
            spacing: 32,
          },
        } as KlayLayoutOptions);
        break;
      case VisualizationAlgorithm.GRID:
        setLayoutOptions({
          name: 'grid',
          animate: true,
          nodeDimensionsIncludeLabels: true,
        });
        break;
      default:
        throw new Error(`Unknown layout algorithm: ${algorithm as string}`);
    }
  }, [algorithm]);

  return (
    <VisualizationLayoutContext.Provider value={layoutContext}>
      {children}
    </VisualizationLayoutContext.Provider>
  );
}
