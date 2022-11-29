import React, { FC } from 'react';
import styled from 'styled-components';

type TabGroupDataType = { id: number; name: string };

type Props = {
  data: TabGroupDataType[];
  selected: number;
  onTabSelected: (periodId: number) => void;
  position?: 'start' | 'end' | 'center';

  justifyContent?: boolean;
};

export const TabGroupPlain: FC<Props> = ({
  data,
  selected,
  onTabSelected,
  position,
  justifyContent,
}) => {
  return (
    <TabContainer justifyContent={justifyContent} position={position}>
      {data.map((item) => {
        const isSelected = selected === item.id;

        return (
          <Tab
            key={item.id}
            selected={isSelected}
            onClick={() => onTabSelected(item.id)}
          >
            <StyledTabText>{item.name}</StyledTabText>
          </Tab>
        );
      })}
    </TabContainer>
  );
};

const TabContainer = styled.div<{
  position?: string;
  justifyContent?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 8px;
  justify-content: ${({ position }) => (position ? position : 'center')};
`;

const Tab = styled.div<{ selected?: boolean; selectedBgColor?: string }>`
  display: flex;
  align-items: center;
  min-height: 32px;
  background-color: grey;
  padding: 0 12px;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledTabText = styled.label`
  white-space: nowrap;
  min-width: 100%;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;
