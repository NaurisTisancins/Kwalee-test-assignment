import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { trpc } from '../trpc';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import {
  FilterCategoryTabType,
  FilterCategoryType,
  GameData,
  TimeFrame,
} from '../types/contextTypes';
import { filterCategories, periods } from './ContextConstants';

dayjs.extend(weekday);

interface ContextInterface {
  jsonData?: GameData[];
  filteredData: any;
  timeFrame: TimeFrame;
  selectedFilterCategory: FilterCategoryTabType;
  selectedSecondaryFilterTab: FilterCategoryTabType | null;
  secondaryFilterTabs: FilterCategoryTabType[];
  setSelectedSecondaryFilterTab: (tab: FilterCategoryTabType) => void;
  selectFilterCategory: (id: number) => void;
  filterByType: (type: FilterCategoryType, timeFrame: TimeFrame) => void;
  onTimeSelection: (
    startDate: string,
    endDate: string,
    periodId: number
  ) => void;
  selectPeriod: (id: number) => void;
}

export const GameContext = createContext<ContextInterface>({
  jsonData: [],
  filteredData: {},
  timeFrame: {
    startDate: '',
    endDate: '',
    period: periods[0],
  },
  secondaryFilterTabs: [],
  selectedFilterCategory: filterCategories[0],
  selectedSecondaryFilterTab: null,
  setSelectedSecondaryFilterTab: () => {},
  selectFilterCategory: () => {},
  filterByType: () => {},
  onTimeSelection: () => {},
  selectPeriod: () => {},
});

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const jsonData = trpc.useQuery(['jsonData']).data;
  const [filteredData, setFilteredData] = useState<any>({});
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(
    filterCategories[0]
  );
  const [timeFrame, setTimeFrame] = useState<TimeFrame>({
    startDate: dayjs().weekday(0).subtract(4, 'year').format('MM/DD/YYYY'),
    endDate: dayjs().weekday(6).subtract(4, 'year').format('MM/DD/YYYY'),
    period: periods[0],
  });
  const [secondaryFilterTabs, setSecondaryFilterTabs] = useState<
    FilterCategoryTabType[]
  >([]);
  const [selectedSecondaryFilterTab, setSelectedSecondaryFilterTab] =
    useState<FilterCategoryTabType | null>(
      secondaryFilterTabs ? secondaryFilterTabs[0] : null
    );

  const selectPeriod = (id: number) => {
    const selectedPeriod = periods.filter((period) => period.id === id);
    setTimeFrame((prev) => {
      return {
        ...prev,
        period: selectedPeriod[0],
      };
    });
  };

  const onTimeSelection = (
    startDate: string,
    endDate: string,
    periodId: number
  ) => {
    setTimeFrame((prev) => {
      return { ...prev, startDate, endDate };
    });
  };

  const selectFilterCategory = (id: number) => {
    const selectedFilterCategory = filterCategories.filter(
      (category) => category.id === id
    );
    setSelectedFilterCategory(selectedFilterCategory[0]);
  };

  useEffect(() => {
    if (jsonData) {
      filterByType(selectedFilterCategory.value, timeFrame);
    }
  }, [jsonData, selectedFilterCategory, timeFrame]);

  const filterByType = (
    filterType: FilterCategoryType,
    timeFrame: TimeFrame
  ) => {
    let filterObject: any = {};
    jsonData?.forEach((entry: GameData) => {
      let key = entry[filterType];
      if (!(key in filterObject)) {
        filterObject[key] = [];
        filterObject[key].push(entry);
      } else {
        filterObject[key].push(entry);
      }

      setFilteredData(filterObject);
    });

    createFilterTabs(filterObject);
  };

  const createFilterTabs = (obj: any) => {
    const secondLeveleFilterTabs: FilterCategoryTabType[] = [];
    let id = 0;
    for (const [key, value] of Object.entries(obj)) {
      id++;
      secondLeveleFilterTabs.push({
        id: id,
        name: key,
        value: key,
      } as FilterCategoryTabType);
    }
    setSelectedSecondaryFilterTab(secondLeveleFilterTabs[0]);
    setSecondaryFilterTabs(secondLeveleFilterTabs);
  };

  return (
    <GameContext.Provider
      value={{
        jsonData,
        selectedFilterCategory,
        selectFilterCategory,
        secondaryFilterTabs,
        selectedSecondaryFilterTab,
        setSelectedSecondaryFilterTab,
        filterByType,
        onTimeSelection,
        selectPeriod,
        filteredData,
        timeFrame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
