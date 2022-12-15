export type FilterCategoryTabType = {
  id: number;
  name: string;
  value: FilterCategoryType;
};

export type FilteredDataType = {
  Data: string;
  name: FilterCategoryType;
  value: number;
};

export type PeriodType = {
  id: number;
  name: string;
  value: string;
};

export type TimeFrame = {
  startDate: string;
  endDate: string;
  period: PeriodType;
};

export type FilterCategoryType = 'Country' | 'App' | 'Platform';

export interface GameData {
  Date: string;
  Country: string;
  App: string;
  Platform: string;
  ['Ad Network']: string;
  ['Daily Users']: string;
}
