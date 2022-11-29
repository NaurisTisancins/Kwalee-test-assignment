import React, { useContext, useEffect, useState } from 'react';
import {
  GameContext,
  GameContextProvider,
  GameData,
} from '../context/GameContext';
import { ScrollableTabGroup } from '../components/ScrollableTabGroup';
import { TabGroupPlain } from '../components/TabGroupPlain';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import styled from 'styled-components';
import { number } from 'yup/lib/locale';
import { string } from 'yup';

dayjs.extend(weekday);
dayjs().localeData();

const periods = [
  { id: 1, name: 'Weekly', value: 'WEEKLY' },
  { id: 2, name: 'Monthly', value: 'MONTHLY' },
  { id: 3, name: 'Yearly', value: 'YEARLY' },
];

type PeriodType = {
  id: number;
  name: string;
  value: string;
};

type FilterCategoryType = 'Country' | 'App' | 'Platform';

const filterCategories: FilterCategoryTabType[] = [
  {
    id: 1,
    name: 'Country',
    value: 'Country',
  },
  {
    id: 2,
    name: 'App',
    value: 'App',
  },
  {
    id: 3,
    name: 'Platform',
    value: 'Platform',
  },
];

type FilterCategoryTabType = {
  id: number;
  name: string;
  value: FilterCategoryType;
};

type TimeFrame = {
  startDate: string;
  endDate: string;
  period: PeriodType;
};

export const MainComponent = () => {
  const { jsonData } = useContext(GameContext);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(
    filterCategories[0]
  );
  const [timeFrame, setTimeFrame] = useState({
    startDate: dayjs().weekday(0).format('MM/DD/YYYY'),
    endDate: dayjs().weekday(6).format('MM/DD/YYYY'),
    period: periods[0],
  });
  const [filteredData, setFilteredData] = useState<any>({});

  const selectFilterCategory = (id: number) => {
    const selectedFilterCategory = filterCategories.filter(
      (category) => category.id === id
    );
    setSelectedFilterCategory(selectedFilterCategory[0]);
  };

  const selectPeriod = (id: number) => {
    const selectedPeriod = periods.filter((period) => period.id === id);
    setTimeFrame((prev) => {
      return {
        ...prev,
        period: selectedPeriod[0],
      };
    });
  };

  useEffect(() => {
    console.log(timeFrame);
    filterByType(selectedFilterCategory.value, timeFrame);
  }, [selectedFilterCategory, timeFrame]);

  useEffect(() => {
    if (jsonData) filterByType(selectedFilterCategory.value, timeFrame);
  }, [jsonData]);

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
  };
  const filterByDate = () => {};

  const onTimeSelection = (
    startDate: string,
    endDate: string,
    periodId: number
  ) => {
    setTimeFrame((prev) => {
      return { ...prev, startDate, endDate };
    });
  };

  return (
    <Container>
      <TabContainer>
        <TabGroupPlain
          data={periods}
          selected={timeFrame.period.id}
          onTabSelected={selectPeriod}
          position={'center'}
          justifyContent={true}
        />
        <ScrollableTabGroup
          selectedPeriod={timeFrame.period.id}
          onTabSelected={onTimeSelection}
        />
        <TabGroupPlain
          data={filterCategories}
          selected={selectedFilterCategory.id}
          onTabSelected={selectFilterCategory}
          position={'center'}
          justifyContent={true}
        />
      </TabContainer>
      <ChartsContainer>
        {filteredData && JSON.stringify(filteredData, null, 3)}
      </ChartsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 80px;
  width: 100%;
`;

const ChartsContainer = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: hidden;
`;
