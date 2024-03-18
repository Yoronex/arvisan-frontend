import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import {
  IColoringSettings,
} from '../helpers/color';
import { useDependencyProfileColoring } from '../modules/outsystems';
import useColorShading from '../hooks/useColorShading';
import {
  useDependencyDifferenceColoring,
  useIncomingDepsColoring,
  useOutgoingDepsColoring,
  useStructureColoring,
} from '../components/coloringModes';

interface IColoringContext {
  currentMode?: IColoringSettings;
  setMode: (modeName: string) => void;
  options: IColoringSettings[];
  resetColoring: () => void;

  range?: [number, number];
  setRange: (range: [number, number] | undefined) => void;

  shadeColorByDepth: (node: cytoscape.NodeSingular, hexColor: string) => string,
}

export const ColoringContext = createContext<IColoringContext>({
  setMode: () => {},
  options: [],
  resetColoring: () => {},
  setRange: () => {},
  shadeColorByDepth: () => '',
});

interface Props extends PropsWithChildren {}

export default function ColoringContextProvider({ children }: Props) {
  const { shadeColorByDepth } = useColorShading();
  const { coloring: structureColoring } = useStructureColoring();
  const { coloring: incomingDependenciesColoring } = useIncomingDepsColoring();
  const { coloring: outgoingDependenciesColoring } = useOutgoingDepsColoring();
  const { coloring: dependencyDifferenceColoring } = useDependencyDifferenceColoring();
  const { coloring: dependencyProfileColoring } = useDependencyProfileColoring();

  const defaultMode = structureColoring.name;
  const [mode, setMode] = useState<string>(defaultMode);
  const [range, setRange] = useState<[number, number] | undefined>();

  const coloringContext = useMemo((): IColoringContext => {
    const options: IColoringSettings[] = [
      structureColoring,
      incomingDependenciesColoring,
      outgoingDependenciesColoring,
      dependencyDifferenceColoring,
      dependencyProfileColoring,
    ];

    const currentMode = options.find((o) => o.name === mode);

    const resetColoring = () => {
      setMode(defaultMode);
    };

    return {
      currentMode,
      setMode,
      options,
      resetColoring,
      range,
      setRange,
      shadeColorByDepth,
    };
  }, [structureColoring, incomingDependenciesColoring, outgoingDependenciesColoring,
    dependencyDifferenceColoring, dependencyProfileColoring,
    range, shadeColorByDepth, mode, defaultMode]);

  return (
    <ColoringContext.Provider value={coloringContext}>
      {children}
    </ColoringContext.Provider>
  );
}
