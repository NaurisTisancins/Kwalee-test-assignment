import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useContext, useEffect, useState } from 'react';
import { FilterCategoryTabType, type GameData } from '../types/contextTypes';
import { GameContext } from '../context/GameContext';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { ScrollableTabGroup } from './ScrollableTabGroub';

const dateParser = (dateString: string): number => {
  let dateParts: string[] = dateString.split('/');
  let dateObject = new Date(
    +dateParts[2],
    +dateParts[1] - 1,
    +dateParts[0]
  ).getTime();
  return dateObject;
};

export const ChartContainer = () => {
  const {
    filteredData,
    timeFrame,
    selectedFilterCategory,
    secondaryFilterTabs,
    selectedSecondaryFilterTab,
    setSelectedSecondaryFilterTab,
  } = useContext(GameContext);

  const [options, setOptions] = useState<Highcharts.Options>({});

  const selectSecondaryFilterTab = (id: number) => {
    const selectedTab = secondaryFilterTabs.find(
      (tab: FilterCategoryTabType) => tab.id === id
    );
    if (selectedTab) {
      setSelectedSecondaryFilterTab(selectedTab);
    }
  };

  const setOptionsForChart = () => {
    if (!selectedSecondaryFilterTab?.value) {
      return;
    }

    setOptions({
      credits: {
        enabled: false,
      },
      chart: {
        spacingTop: 16,
      },
      title: {
        text: '',
        floating: true,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function (this) {
            return Highcharts.dateFormat('%b/%e/%Y', +this.value);
          },
        },
      },
      plotOptions: {
        series: {
          marker: {
            symbol: 'circle',
            radius: 2,
          },
          lineWidth: 2,
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          turboThreshold: 0,
          name: 'Daily Users',
          data: filteredData[selectedSecondaryFilterTab.value]
            .map((data: GameData) => {
              return {
                y: parseInt(data['Daily Users']),
                x: dateParser(data.Date),
              };
            })
            .sort((a: any, b: any) => a.x - b.x)
            .filter(
              (data: any) =>
                dayjs(data.x) >= dayjs(timeFrame.startDate) &&
                dayjs(data.x) <= dayjs(timeFrame.endDate)
            ),
          type: 'line',
        },
      ],
    });
  };

  useEffect(() => {
    if (selectedSecondaryFilterTab) setOptionsForChart();
  }, [filteredData, selectedFilterCategory, selectedSecondaryFilterTab]);

  return (
    <Container>
      <h3>Current data only available in year 2018!</h3>
      <TabContainer>
        {selectedSecondaryFilterTab && (
          <ScrollableTabGroup
            data={secondaryFilterTabs}
            selected={selectedSecondaryFilterTab?.id}
            onTabSelected={selectSecondaryFilterTab}
          />
        )}
      </TabContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: '100%', width: '100%' } }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  @media (max-width: 768px) {
    max-width: 500px;
    flex-shrink: inherit;
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  max-width: 100%;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 500px;
    flex-shrink: inherit;
  }
`;
