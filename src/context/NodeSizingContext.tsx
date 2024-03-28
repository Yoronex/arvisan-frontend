import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { IMetricSettings } from '../helpers/metrics';
import { DEFAULT_NODE_COLOR } from '../helpers/color';
import { useEncapsulationColoring, useSimpleLeafPropertyColoring } from '../hooks/coloringModes';

interface INodeSizingContext {
  verticalSizingMode: IMetricSettings;
  setVerticalMode: (modeName: string) => void;
  horizontalSizingMode: IMetricSettings;
  setHorizontalMode: (modeName: string) => void;
  resetNodeSizing: () => void;

  options: IMetricSettings[];
}

const labelSizingMode: IMetricSettings = {
  name: 'Fit label',
  nodeDetailsValue: () => null,
  nodeDetailsTitle: '',
  type: 'category',
  legend: new Map([]),
  sizeFunction: () => 'label',
  colorFunction(): string {
    return DEFAULT_NODE_COLOR;
  },
};

export const NodeSizingContext = createContext<INodeSizingContext>({
  verticalSizingMode: labelSizingMode,
  setVerticalMode: () => {},
  horizontalSizingMode: labelSizingMode,
  setHorizontalMode: () => {},
  resetNodeSizing: () => {},
  options: [],
});

interface Props extends PropsWithChildren {}

export default function NodeSizingContextProvider({ children }: Props) {
  const { colorings: simpleLeafColorings } = useSimpleLeafPropertyColoring();
  const { colorings: encapsulationColorings } = useEncapsulationColoring();

  const defaultModeName = labelSizingMode.name;
  const [verticalSizingModeName, setVerticalSizingModeName] = useState(defaultModeName);
  const [horizontalSizingModeName, setHorizontalSizingModeName] = useState(defaultModeName);

  const options: IMetricSettings[] = useMemo(() => ([
    labelSizingMode,
    ...simpleLeafColorings,
    ...encapsulationColorings,
  ].filter((c) => c.sizeFunction !== undefined)), [encapsulationColorings, simpleLeafColorings]);

  const nodeSizingContext = useMemo((): INodeSizingContext => {
    const verticalSizingMode = options.find((o) => o.name === verticalSizingModeName)
      ?? labelSizingMode;
    const horizontalSizingMode = options.find((o) => o.name === horizontalSizingModeName)
      ?? labelSizingMode;

    const resetNodeSizing = () => {
      setVerticalSizingModeName(defaultModeName);
      setHorizontalSizingModeName(defaultModeName);
    };

    return {
      verticalSizingMode,
      setVerticalMode: setVerticalSizingModeName,
      horizontalSizingMode,
      setHorizontalMode: setHorizontalSizingModeName,
      resetNodeSizing,
      options,
    };
  }, [defaultModeName, horizontalSizingModeName, options, verticalSizingModeName]);

  return (
    <NodeSizingContext.Provider value={nodeSizingContext}>
      {children}
    </NodeSizingContext.Provider>
  );
}
