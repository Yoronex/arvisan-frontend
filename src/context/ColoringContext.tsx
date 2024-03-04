import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { GraphColoringMode } from '../helpers/enums';

interface IColoringContext {
  mode: GraphColoringMode;
  range?: [number, number];
  setMode: (m: GraphColoringMode) => void;
  setRange: (range: [number, number] | undefined) => void;
}

export const ColoringContext = createContext<IColoringContext>({
  mode: GraphColoringMode.STRUCTURE,
  setMode: () => {},
  setRange: () => {},
});

interface Props extends PropsWithChildren {}

export default function ColoringContextProvider({ children }: Props) {
  const [mode, setMode] = useState<GraphColoringMode>(GraphColoringMode.STRUCTURE);
  const [range, setRange] = useState<[number, number] | undefined>();

  const coloringContext = useMemo((): IColoringContext => ({
    mode,
    range,
    setMode,
    setRange,
  }), [mode, range]);

  return (
    <ColoringContext.Provider value={coloringContext}>
      {children}
    </ColoringContext.Provider>
  );
}
