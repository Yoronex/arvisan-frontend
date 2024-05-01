import {
  createContext, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import { GraphService } from '../api';

interface ISeederContext {
  loading: boolean;
  present: boolean;
}

export const SeederContext = createContext<ISeederContext>({
  loading: true,
  present: false,
});

export default function SeederContextProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [present, setPresent] = useState(false);

  useEffect(() => {
    GraphService.canUseGraphImport()
      .then((r) => setPresent(r))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const seederContext = useMemo((): ISeederContext => ({
    loading,
    present,
  }), [loading, present]);

  return (
    <SeederContext.Provider value={seederContext}>
      {children}
    </SeederContext.Provider>
  );
}
