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
  range?: [number, number];
  setMode: (modeName: string) => void;
  setRange: (range: [number, number] | undefined) => void;

  options: IColoringSettings[];
  currentMode?: IColoringSettings;

  shadeColorByDepth: (node: cytoscape.NodeSingular, hexColor: string) => string,
}

export const ColoringContext = createContext<IColoringContext>({
  setMode: () => {},
  setRange: () => {},
  options: [],
  shadeColorByDepth: () => '',
});

interface Props extends PropsWithChildren {}

export default function ColoringContextProvider({ children }: Props) {
  const [mode, setMode] = useState<string>('Structure');
  const [range, setRange] = useState<[number, number] | undefined>();

  const { shadeColorByDepth } = useColorShading();
  const { coloring: structureColoring } = useStructureColoring();
  const { coloring: incomingDependenciesColoring } = useIncomingDepsColoring();
  const { coloring: outgoingDependenciesColoring } = useOutgoingDepsColoring();
  const { coloring: dependencyDifferenceColoring } = useDependencyDifferenceColoring();
  const { coloring: dependencyProfileColoring } = useDependencyProfileColoring();

  const coloringContext = useMemo((): IColoringContext => {
    const options: IColoringSettings[] = [
      structureColoring,
      incomingDependenciesColoring,
      outgoingDependenciesColoring,
      dependencyDifferenceColoring,
      dependencyProfileColoring,
    ];

    const currentMode = options.find((o) => o.name === mode);

    return {
      currentMode,
      range,
      setMode,
      setRange,
      options,
      shadeColorByDepth,
    };
  }, [
    dependencyDifferenceColoring, dependencyProfileColoring,
    incomingDependenciesColoring, outgoingDependenciesColoring,
    mode, range, shadeColorByDepth, structureColoring,
  ]);

  return (
    <ColoringContext.Provider value={coloringContext}>
      {children}
    </ColoringContext.Provider>
  );
}
