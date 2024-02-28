import {
  createContext, PropsWithChildren, SetStateAction, useMemo, useState,
} from 'react';
import { Violations } from '../api';
import { VisibilityOptions } from '../helpers/enums';

export interface ViolationVisibility {
  dependencyCycles: VisibilityOptions;
  subLayers: VisibilityOptions;
  nonViolations: VisibilityOptions;
}

interface IViolationsContext {
  violations: Violations;
  setViolations: (v: SetStateAction<Violations>) => void;
  visibility: ViolationVisibility,
  setVisibility: (e: SetStateAction<ViolationVisibility>) => void;
  resetVisibility: () => void;
}

const defaultViolationVisibility: ViolationVisibility = ({
  dependencyCycles: VisibilityOptions.HIGHLIGHTED,
  subLayers: VisibilityOptions.HIGHLIGHTED,
  nonViolations: VisibilityOptions.VISIBLE,
});

export const ViolationsContext = createContext<IViolationsContext>({
  violations: {
    dependencyCycles: [],
    subLayers: [],
  },
  setViolations: () => {},
  visibility: defaultViolationVisibility,
  setVisibility: () => {},
  resetVisibility: () => {},
});

export default function ViolationsContextProvider({ children }: PropsWithChildren) {
  const [violations, setViolations] = useState<Violations>({
    dependencyCycles: [],
    subLayers: [],
  });
  const [visibility, setVisibility] = useState<ViolationVisibility>(defaultViolationVisibility);

  const resetVisibility = () => {
    setVisibility(defaultViolationVisibility);
  };

  const violationsContext = useMemo((): IViolationsContext => ({
    violations,
    setViolations,
    visibility,
    setVisibility,
    resetVisibility,
  }), [violations, visibility]);

  return (
    <ViolationsContext.Provider value={violationsContext}>
      {children}
    </ViolationsContext.Provider>
  );
}
