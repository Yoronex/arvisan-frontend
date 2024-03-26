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
  useStructureColoring,
  useSimpleLeafPropertyColoring,
  useEncapsulationColoring,
} from '../hooks/coloringModes';
import useCohesionColoring from '../hooks/coloringModes/useCohesionColoring';

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
  const { colorings: simpleLeafColorings } = useSimpleLeafPropertyColoring();
  const { coloring: dependencyProfileColoring } = useDependencyProfileColoring();
  const { colorings: encapsulationColorings } = useEncapsulationColoring();
  const { coloring: cohesionColoring } = useCohesionColoring();

  const defaultMode = structureColoring.name;
  const [mode, setMode] = useState<string>(defaultMode);
  const [range, setRange] = useState<[number, number] | undefined>();

  const options: IColoringSettings[] = useMemo(() => ([
    structureColoring,
    ...simpleLeafColorings,
    dependencyProfileColoring,
    ...encapsulationColorings,
    cohesionColoring,
  ]), [
    dependencyProfileColoring, encapsulationColorings, simpleLeafColorings,
    structureColoring, cohesionColoring,
  ]);

  const coloringContext = useMemo((): IColoringContext => {
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
  }, [options, range, shadeColorByDepth, mode, defaultMode]);

  return (
    <ColoringContext.Provider value={coloringContext}>
      {children}
    </ColoringContext.Provider>
  );
}
