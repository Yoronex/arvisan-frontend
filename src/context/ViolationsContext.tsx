import {
  createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { Violations } from '../api';

interface IViolationsContext {
  violations: Violations;
  setViolations: (v: Violations) => void;
}

export const ViolationsContext = createContext<IViolationsContext>({
  violations: {
    dependencyCycles: [],
    subLayers: [],
  },
  setViolations: () => {},
});

export default function ViolationsContextProvider({ children }: PropsWithChildren) {
  const [violations, setViolations] = useState<Violations>({
    dependencyCycles: [],
    subLayers: [],
  });

  const violationsContext = useMemo((): IViolationsContext => ({
    violations,
    setViolations,
  }), [violations]);

  return (
    <ViolationsContext.Provider value={violationsContext}>
      {children}
    </ViolationsContext.Provider>
  );
}
