import React, { FC, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

type TabGroupDataType = { id: number; name: string };

type Props = {
  data: TabGroupDataType[];
  selected: number;
  onTabSelected: (id: number) => void;
  disableRepetition?: boolean;
};

export const ScrollableTabGroup: FC<Props> = ({
  data,
  selected,
  onTabSelected,
  disableRepetition,
}) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabElementbRef = useRef<HTMLDivElement>(null);
  const scrollTabs = (isToRight: boolean) => {
    const selectedIndex = findCurrentTabIndex();
    const isLast = selectedIndex + 1 === data.length;
    const isFirst = selectedIndex === 0;

    if (tabsContainerRef) {
      const wid = Number(tabElementbRef.current?.clientWidth);

      if (isToRight) {
        if (!disableRepetition) {
          onTabSelected(isLast ? data[0].id : data[selectedIndex + 1].id);
        } else {
          onTabSelected(
            isLast ? data[selectedIndex].id : data[selectedIndex + 1].id
          );
        }
      } else {
        if (!disableRepetition) {
          onTabSelected(
            isFirst ? data[data.length - 1].id : data[selectedIndex - 1].id
          );
        } else {
          onTabSelected(
            isFirst ? data[selectedIndex].id : data[selectedIndex - 1].id
          );
        }
      }
      tabsContainerRef.current?.scrollBy({
        left: isToRight ? tabElementbRef.current?.clientWidth : -wid,
        behavior: 'smooth',
      });
    }
  };

  const findCurrentTabIndex = () => {
    const currentIdx = data.findIndex((item) => {
      return item.id === selected;
    });
    return currentIdx;
  };

  return (
    <TabsWrapper>
      {data.length > 0 && (
        <TabsContainer>
          <TabsLeftContainer
            onClick={() => {
              scrollTabs(false);
            }}
          >
            {'<'}
          </TabsLeftContainer>
          <TabsMidContainer ref={tabsContainerRef}>
            {data.map((f) => {
              return (
                <TabElement
                  key={f.id}
                  selected={f.id === selected}
                  onClick={() => {
                    onTabSelected(f.id);
                  }}
                  ref={tabElementbRef}
                >
                  <TabContent>
                    <StyledText color={selected ? 'grey' : 'white'}>
                      {f.name}
                    </StyledText>
                  </TabContent>
                </TabElement>
              );
            })}
          </TabsMidContainer>
          <TabsRightContainer onClick={() => scrollTabs(true)}>
            {'>'}
          </TabsRightContainer>
        </TabsContainer>
      )}
    </TabsWrapper>
  );
};

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 32px;
  height: 40px;
  width: 100%;
`;

export const TabsLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  border-radius: 8px;
  background-color: grey;
  margin-right: 4px;
`;

export const TabsRightContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  border-radius: 8px;
  background-color: grey;
  margin-left: 4px;
`;

export const TabsMidContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-x: auto;
  width: 100%;
  justify-content: start;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;
export const TabElement = styled.label<{ selected: boolean }>`
  display: flex;
  height: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  line-height: 32px;
  padding: 0 12px;
  background-color: ${({ theme, selected }) => (selected ? 'grey' : undefined)};
  border-radius: 8px;
  margin: 0 4px;

  &:hover {
    background-color: grey;
  }
`;

const TabContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2;
`;

const StyledText = styled.label`
  display: flex;
  min-width: 100%;
  justify-content: center;
  white-space: nowrap;
`;

export const IconContainer = styled.div`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;
