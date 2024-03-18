import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import cytoscape from 'cytoscape';
import { GraphColoringMode } from '../helpers/enums';
import { getIncomingOutgoingRatio, getNrIncomingFunctionDeps, getNrOutgoingFunctionDeps } from '../cytoscape/operations';
import {
  ColoringModeColors, getRatioColor, IColoringSettings,
} from '../helpers/color';
import { useDependencyProfileColoring } from '../modules/outsystems';
import useColorShading from '../hooks/useColorShading';

interface IColoringContext {
  mode: GraphColoringMode;
  range?: [number, number];
  setMode: (m: GraphColoringMode) => void;
  setRange: (range: [number, number] | undefined) => void;

  options: Map<GraphColoringMode, IColoringSettings | undefined>;
  currentMode?: IColoringSettings | undefined;

  shadeColorByDepth: (node: cytoscape.NodeSingular, hexColor: string) => string,
}

export const ColoringContext = createContext<IColoringContext>({
  mode: GraphColoringMode.STRUCTURE,
  setMode: () => {},
  setRange: () => {},
  options: new Map(),
  shadeColorByDepth: () => '',
});

interface Props extends PropsWithChildren {}

export default function ColoringContextProvider({ children }: Props) {
  const [mode, setMode] = useState<GraphColoringMode>(GraphColoringMode.STRUCTURE);
  const [range, setRange] = useState<[number, number] | undefined>();

  const { shadeColorByDepth } = useColorShading();
  const { coloring: dependencyProfileColoring } = useDependencyProfileColoring();

  const coloringContext = useMemo((): IColoringContext => {
    const coloringModeOptions: Map<GraphColoringMode, IColoringSettings | undefined> = new Map([
      [GraphColoringMode.STRUCTURE, {
        name: 'Structure',
        type: 'category',
        colorFunction: (node: cytoscape.NodeSingular) => {
          const hexColor = node.data('properties.color') as string;
          if (!hexColor) return '';
          return shadeColorByDepth(node, hexColor);
        },
        legend: new Map([]),
      }],
      [GraphColoringMode.INCOMING_DEPENDENCIES, {
        name: 'Incoming dependencies',
        type: 'ratio',
        rangeFunction: (nodes: cytoscape.NodeCollection) => {
          let min = Number.POSITIVE_INFINITY;
          let max = Number.NEGATIVE_INFINITY;

          nodes.forEach((node) => {
            const value = getNrIncomingFunctionDeps(node);
            min = Math.min(min, value);
            max = Math.max(max, value);
          });

          return [min, max];
        },
        colorFunction: (node: cytoscape.NodeSingular, range2: [number, number]) => {
          const [min, max] = range2;
          const incomingDeps = getNrIncomingFunctionDeps(node);
          const [firstColor, secondColor, ...restColors] = ColoringModeColors
            .get(GraphColoringMode.INCOMING_DEPENDENCIES) || [];

          return getRatioColor(
            (incomingDeps - min) / (max - min),
            firstColor,
            secondColor,
            ...restColors,
          );
        },
      }],
      [GraphColoringMode.OUTGOING_DEPENDENCIES, {
        name: 'Outgoing dependencies',
        type: 'ratio',
        rangeFunction: (nodes: cytoscape.NodeCollection) => {
          let min = Number.POSITIVE_INFINITY;
          let max = Number.NEGATIVE_INFINITY;

          nodes.forEach((node) => {
            const value = getNrOutgoingFunctionDeps(node);
            min = Math.min(min, value);
            max = Math.max(max, value);
          });

          return [min, max];
        },
        colorFunction: (node: cytoscape.NodeSingular, range2: [number, number]) => {
          const [min, max] = range2;
          const incomingDeps = getNrOutgoingFunctionDeps(node);
          const [firstColor, secondColor, ...restColors] = ColoringModeColors
            .get(GraphColoringMode.OUTGOING_DEPENDENCIES) || [];
          return getRatioColor(
            (incomingDeps - min) / (max - min),
            firstColor,
            secondColor,
            ...restColors,
          );
        },
      }],
      [GraphColoringMode.INCOMING_OUTGOING_DEPS_RATIO, {
        name: 'Dependency ratio',
        type: 'ratio',
        rangeFunction: (nodes: cytoscape.NodeCollection) => {
          let min = Number.POSITIVE_INFINITY;
          let max = Number.NEGATIVE_INFINITY;

          nodes.forEach((node) => {
            const value = getIncomingOutgoingRatio(node);
            min = Math.min(min, value);
            max = Math.max(max, value);
          });

          return [min, max];
        },
        colorFunction: (node: cytoscape.NodeSingular, range2: [number, number]) => {
          const [min, max] = range2;
          const incomingDeps = getIncomingOutgoingRatio(node);
          const [firstColor, secondColor, ...restColors] = ColoringModeColors
            .get(GraphColoringMode.INCOMING_OUTGOING_DEPS_RATIO) || [];
          return getRatioColor(
            (incomingDeps - min) / (max - min),
            firstColor,
            secondColor,
            ...restColors,
          );
        },
      }],
      [GraphColoringMode.DEPENDENCY_PROFILE, dependencyProfileColoring],
    ]);

    const currentMode = coloringModeOptions.get(mode);

    return {
      mode,
      currentMode,
      range,
      setMode,
      setRange,
      options: coloringModeOptions,
      shadeColorByDepth,
    };
  }, [dependencyProfileColoring, mode, range, shadeColorByDepth]);

  return (
    <ColoringContext.Provider value={coloringContext}>
      {children}
    </ColoringContext.Provider>
  );
}
