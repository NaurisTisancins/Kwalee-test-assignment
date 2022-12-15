import React, { useContext, useEffect, useState } from 'react';
import { GameContext, GameContextProvider } from '../context/GameContext';
import { filterCategories } from '../context/ContextConstants';
import { DateScrollableTabGroup } from '../components/DateScrollableTabGroup';
import { TabGroupPlain } from '../components/TabGroupPlain';
import { ChartContainer } from '../components/ChartContainer';
import styled from 'styled-components';
import { FilterCategoryTabType } from '../types/contextTypes';

const periods = [
  { id: 1, name: 'Weekly', value: 'WEEKLY' },
  { id: 2, name: 'Monthly', value: 'MONTHLY' },
  { id: 3, name: 'Yearly', value: 'YEARLY' },
];

export const MainComponent = () => {
  const {
    selectFilterCategory,
    selectedFilterCategory,
    filteredData,
    selectPeriod,
    timeFrame,
    onTimeSelection,
  } = useContext(GameContext);

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
        <DateScrollableTabGroup
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
        <ChartContainer />
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
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  height: 80vh;
  overflow-y: hidden;
`;
