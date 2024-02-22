import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { Violations } from '../api';

export interface ViolationVisibility {
  dependencyCycles: boolean;
  subLayers: boolean;
}

interface IViolationsContext {
  violations: Violations;
  setViolations: (v: Violations) => void;
  visibility: ViolationVisibility,
  setVisibility: (v: ViolationVisibility) => void;
}

export const ViolationsContext = createContext<IViolationsContext>({
  violations: {
    dependencyCycles: [],
    subLayers: [],
  },
  setViolations: () => {},
  visibility: {
    dependencyCycles: true,
    subLayers: true,
  },
  setVisibility: () => {},
});

export default function ViolationsContextProvider({ children }: PropsWithChildren) {
  const [violations, setViolations] = useState<Violations>({
    dependencyCycles: [],
    subLayers: [],
  });
  const [visibility, setVisibility] = useState<ViolationVisibility>({
    dependencyCycles: true,
    subLayers: true,
  });

  const violationsContext = useMemo((): IViolationsContext => ({
    violations,
    setViolations,
    visibility,
    setVisibility,
  }), [violations, visibility]);

  return (
    <ViolationsContext.Provider value={violationsContext}>
      {children}
    </ViolationsContext.Provider>
  );
}
