import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearData, INITIAL_DATA, loadData, saveData } from '../services/storageService';

const CycleContext = createContext(null);

export function CycleProvider({ children }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData().then((storedData) => {
      setData(storedData);
      setIsLoading(false);
    });
  }, []);

  const persist = useCallback(async (nextData) => {
    setData(nextData);
    await saveData(nextData);
  }, []);

  const startCycle = useCallback(
    async ({ medicationName, startDate, endDate }) => {
      const activeCycle = {
        id: String(Date.now()),
        medicationName,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      await persist({ ...data, activeCycle });
    },
    [data, persist]
  );

  const finishCycle = useCallback(
    async ({ painLevel, sideEffects, notes }) => {
      if (!data.activeCycle) return;
      const record = {
        ...data.activeCycle,
        painLevel,
        sideEffects,
        notes,
        registeredAt: new Date().toISOString(),
      };
      await persist({ activeCycle: null, records: [record, ...data.records] });
    },
    [data, persist]
  );

  const resetData = useCallback(async () => {
    await clearData();
    setData(INITIAL_DATA);
  }, []);

  const value = useMemo(
    () => ({ ...data, isLoading, startCycle, finishCycle, resetData }),
    [data, isLoading, startCycle, finishCycle, resetData]
  );

  return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
}

export function useCycle() {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error('useCycle deve ser usado dentro de um CycleProvider');
  }
  return context;
}