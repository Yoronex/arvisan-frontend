import {
  createContext, PropsWithChildren, SetStateAction, useMemo, useState,
} from 'react';

interface IGraphFilterSettings {
  layerDepth: number,
  dependencyLength: number,
  showOutgoing: boolean;
  minOutgoing: number;
  maxOutgoing: number;
  showIncoming: boolean;
  minIncoming: number;
  maxIncoming: number;
  showSelectionInternalRelationships: boolean;
  showDomainInternalRelationships: boolean;
  showExternalRelationships: boolean;
  selfEdges: boolean;
  includeNoDomain: boolean;
  showRuntimeDependencies: boolean;
  showCompileTimeDependencies: boolean;
  showEntityDependencies: boolean;
}

interface IGraphSettings {
  settings: IGraphFilterSettings,
  updateSettings: (settings: SetStateAction<IGraphFilterSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: IGraphFilterSettings = {
  layerDepth: 1,
  dependencyLength: 1,
  showOutgoing: true,
  minOutgoing: 0,
  maxOutgoing: Number.POSITIVE_INFINITY,
  showIncoming: false,
  minIncoming: 0,
  maxIncoming: Number.POSITIVE_INFINITY,
  showSelectionInternalRelationships: true,
  showDomainInternalRelationships: true,
  showExternalRelationships: true,
  selfEdges: true,
  includeNoDomain: true,
  showRuntimeDependencies: true,
  showCompileTimeDependencies: true,
  showEntityDependencies: true,
};

export const GraphSettingsContext = createContext<IGraphSettings>({
  settings: defaultSettings,
  updateSettings: () => {},
  resetSettings: () => {},
});

interface Props extends PropsWithChildren {}

export default function GraphSettingsContextProvider({ children }: Props) {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (newSettings: SetStateAction<IGraphFilterSettings>) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const graphSettingsContext = useMemo((): IGraphSettings => ({
    settings,
    updateSettings,
    resetSettings,
  }), [settings]);

  return (
    <GraphSettingsContext.Provider value={graphSettingsContext}>
      {children}
    </GraphSettingsContext.Provider>
  );
}
