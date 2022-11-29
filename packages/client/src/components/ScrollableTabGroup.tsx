import React, { FC, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
import toObject from 'dayjs/plugin/toObject';

dayjs.extend(toObject);
dayjs.extend(updateLocale);
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs().localeData();

dayjs.updateLocale('en', {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
});

export type PeriodBarType = {
  startDate: string;
  endDate?: string;
};

type Props = {
  selectedPeriod: number;
  onTabSelected: (startDate: string, endDate: string, periodId: number) => void;
};

export const ScrollableTabGroup: FC<Props> = ({
  selectedPeriod = 1,
  onTabSelected,
}) => {
  const [selected, setSelected] = useState<number>(1);

  const requestFormat = 'MM/DD/YYYY';
  const theme = useTheme();

  const [week, setWeek] = useState(
    `${dayjs().weekday(0).format('MM/DD')} - ${dayjs()
      .weekday(6)
      .format('MM/DD')}`
  );
  const [month, setMonth] = useState(dayjs().format('MMMM'));
  const [year, setYear] = useState(dayjs().format('YYYY'));

  const [period, setPeriod] = useState({
    startDate: dayjs().weekday(0).format(requestFormat),
    endDate: dayjs().weekday(6).format(requestFormat),
  });

  const switchWeek = (forward: boolean) => {
    const newStartDate = forward
      ? dayjs(period.startDate).weekday(0).add(1, 'w').format(requestFormat)
      : dayjs(period.startDate)
          .weekday(0)
          .subtract(1, 'w')
          .format(requestFormat);
    const newEndDate = dayjs(newStartDate).add(1, 'w').format(requestFormat);
    fetchNewDataByPeriod(newStartDate, newEndDate, 1);

    setPeriod(() => {
      return {
        startDate: newStartDate,
        endDate: newEndDate,
      };
    });
    const firstDay = dayjs(newStartDate).format('MM/DD');
    const lastDay = dayjs(newEndDate).format('MM/DD');
    setWeek(`${firstDay} - ${lastDay}`);
  };

  const switchMonth = (forward: boolean) => {
    const newStartDate = forward
      ? dayjs(period.startDate).add(1, 'month').format(requestFormat)
      : dayjs(period.startDate).subtract(1, 'month').format(requestFormat);
    const newEndDate = dayjs(newStartDate)
      .add(1, 'month')
      .subtract(1, 'day')
      .format(requestFormat);
    fetchNewDataByPeriod(newStartDate, newEndDate, 2);

    setPeriod(() => {
      return {
        startDate: newStartDate,
        endDate: newEndDate,
      };
    });
    const month = dayjs(newStartDate).format('MMMM');
    setMonth(month);
  };

  const switchYear = (forward: boolean) => {
    const newStartDate = forward
      ? dayjs(period.startDate).add(1, 'year').format(requestFormat)
      : dayjs(period.startDate).subtract(1, 'year').format(requestFormat);
    const newEndDate = dayjs(newStartDate)
      .add(1, 'year')
      .subtract(1, 'day')
      .format(requestFormat);
    fetchNewDataByPeriod(newStartDate, newEndDate, 3);

    setPeriod(() => {
      return {
        startDate: newStartDate,
        endDate: newEndDate,
      };
    });
    const year = dayjs(newStartDate).format('YYYY');
    setYear(year);
  };

  const switchTimeFrame = (forward: boolean) => {
    switch (selectedPeriod) {
      case 1:
        switchWeek(forward);
        break;
      case 2:
        switchMonth(forward);
        break;
      case 3:
        switchYear(forward);
        break;
    }
  };

  const selectedName = useMemo(() => {
    switch (selectedPeriod) {
      case 1:
        return week;
      case 2:
        return month;
      case 3:
        return year;
    }
  }, [period]);

  const setInitialTimeFrame = () => {
    let newStartDate: string;
    let newEndDate: string;
    switch (selectedPeriod) {
      case 1:
        newStartDate = dayjs().weekday(0).format(requestFormat);
        newEndDate = dayjs().weekday(6).format(requestFormat);
        fetchNewDataByPeriod(newStartDate, newEndDate, 1);
        setPeriod(() => {
          return {
            startDate: newStartDate,
            endDate: newEndDate,
          };
        });
        break;
      case 2:
        newStartDate = dayjs()
          .month(dayjs().toObject().months)
          .date(1)
          .format(requestFormat);
        newEndDate = dayjs(newStartDate)
          .month(dayjs().toObject().months)
          .add(1, 'month')
          .subtract(1, 'day')
          .format(requestFormat);
        fetchNewDataByPeriod(newStartDate, newEndDate, 2);
        setPeriod(() => {
          return {
            startDate: newStartDate,
            endDate: newEndDate,
          };
        });
        break;
      case 3:
        newStartDate = dayjs().month(0).date(1).format(requestFormat);
        newEndDate = dayjs().month(12).date(-1).format(requestFormat);
        fetchNewDataByPeriod(newStartDate, newEndDate, 3);
        setPeriod(() => {
          return {
            startDate: newStartDate,
            endDate: newEndDate,
          };
        });

        break;
    }
  };

  useEffect(() => {
    setInitialTimeFrame();
  }, [selectedPeriod]);

  const fetchNewDataByPeriod = (
    startDate: string,
    endDate: string,
    periodId: number
  ) => {
    onTabSelected(startDate, endDate, periodId);
  };

  return (
    <Container>
      <TabsContainer>
        <ButtonContainer onClick={() => switchTimeFrame(false)}>
          <ArrowLeftIcon width='16px' />
        </ButtonContainer>
        <TabsMidContainer>
          {selectedPeriod === 1 ? (
            <WeekContainer>
              <TabElementWeek>
                {dayjs(period.startDate).format('MM/DD')}
              </TabElementWeek>
              <Minus>-</Minus>
              <TabElementWeek>
                {dayjs(period.endDate).format('MM/DD')}
              </TabElementWeek>
            </WeekContainer>
          ) : (
            <TabElement>
              <label>{selectedName}</label>
            </TabElement>
          )}
        </TabsMidContainer>
        <ButtonContainer onClick={() => switchTimeFrame(true)}>
          <ArrowRightIcon width='16px' />
        </ButtonContainer>
      </TabsContainer>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: ${({ theme }) => theme.size32};
  width: 200px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ${({ theme }) => theme.size32};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colorGreyCool50};
  margin-right: 0;
`;

export const TabsMidContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  overflow-x: auto;
  width: 100%;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const WeekContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const TabElement = styled.label<{ selected?: boolean }>`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background-color: grey;
  border-radius: 8px;
`;

export const TabElementWeek = styled.label<{ selected?: boolean }>`
  display: flex;
  width: 100%;
  padding: 0 12px;
  background-color: lightgray;
`;

const Minus = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  background-color: #fff;
`;

export const TabElementIcon = styled.div`
  height: 16px;
  width: 16px;
`;

export default ScrollableTabGroup;
