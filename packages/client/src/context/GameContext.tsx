import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  FC,
} from 'react';
import { trpc } from '../trpc';

interface ContextInterface {
  jsonData?: GameData[];
}

export interface GameData {
  Date: string;
  Country: string;
  App: string;
  Platform: string;
  ['Ad Network']: string;
  ['Daily Users']: string;
}

export const GameContext = createContext<ContextInterface>({
  jsonData: [],
});

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const jsonData = trpc.useQuery(['jsonData']).data;

  return (
    <GameContext.Provider value={{ jsonData }}>{children}</GameContext.Provider>
  );
};
