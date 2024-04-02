import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import useColorShading from '../hooks/useColorShading';
import {
  useSimpleLeafPropertyMetrics,
  useEncapsulationMetrics,
  useDependencyProfileMetrics,
  useCohesionMetrics,
} from '../hooks/metrics';
import { ICategoryMetric, IMetricSettings } from '../helpers/metrics';
import { DEFAULT_NODE_COLOR } from '../helpers/color';

interface IColoringContext {
  currentMode: IMetricSettings;
  setMode: (modeName: string) => void;
  options: IMetricSettings[];
  resetColoring: () => void;

  range?: [number, number];
  setRange: (range: [number, number] | undefined) => void;

  shadeColorByDepth: (node: cytoscape.NodeSingular, hexColor: string) => string,
}

const initStructureColoring: ICategoryMetric = {
  name: 'Structure',
  nodeDetailsTitle: 'Structure',
  nodeDetailsValue() { return null; },
  type: 'category',
  colorFunction: () => DEFAULT_NODE_COLOR,
  sizeFunction: () => 'label',
  legend: new Map([]),
};

export const ColoringContext = createContext<IColoringContext>({
  currentMode: initStructureColoring,
  setMode: () => {},
  options: [],
  resetColoring: () => {},
  setRange: () => {},
  shadeColorByDepth: () => '',
});

interface Props extends PropsWithChildren {}

export default function ColoringContextProvider({ children }: Props) {
  const { shadeColorByDepth } = useColorShading();
  const { colorings: simpleLeafColorings } = useSimpleLeafPropertyMetrics();
  const { coloring: dependencyProfileColoring } = useDependencyProfileMetrics();
  const { colorings: encapsulationColorings } = useEncapsulationMetrics();
  const { coloring: cohesionColoring } = useCohesionMetrics();

  const structureColoring: ICategoryMetric = useMemo(() => ({
    ...initStructureColoring,
    colorFunction: (node: cytoscape.NodeSingular) => {
      const hexColor = node.data('properties.color') as string;
      if (!hexColor) return '';
      return shadeColorByDepth(node, hexColor);
    },
  }), [shadeColorByDepth]);

  const defaultMode = structureColoring.name;

  const [mode, setMode] = useState<string>(defaultMode);
  const [range, setRange] = useState<[number, number] | undefined>();

  const options: IMetricSettings[] = useMemo(() => ([
    structureColoring,
    ...simpleLeafColorings,
    dependencyProfileColoring,
    ...encapsulationColorings,
    cohesionColoring,
  ].filter((c) => c.colorFunction !== undefined)), [
    dependencyProfileColoring, encapsulationColorings, simpleLeafColorings,
    structureColoring, cohesionColoring,
  ]);

  const coloringContext = useMemo((): IColoringContext => {
    const currentMode = options.find((o) => o.name === mode) ?? structureColoring;

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
