import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { GraphColoringMode } from '../helpers/enums';

interface IColoringContext {
  mode: GraphColoringMode;
  setMode: (m: GraphColoringMode) => void;
}

export const ColoringContext = createContext<IColoringContext>({
  mode: GraphColoringMode.STRUCTURE,
  setMode: () => {},
});

interface Props extends PropsWithChildren {}

export default function ColoringContextProvider({ children }: Props) {
  const [mode, setMode] = useState<GraphColoringMode>(GraphColoringMode.STRUCTURE);

  const coloringContext = useMemo((): IColoringContext => ({
    mode,
    setMode,
  }), [mode]);

  return (
    <ColoringContext.Provider value={coloringContext}>
      {children}
    </ColoringContext.Provider>
  );
}
