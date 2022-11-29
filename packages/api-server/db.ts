import fs from 'fs';
import { parse } from 'csv-parse';
import CSVToJSON from 'csvtojson';

const filePath = './data/data.csv';

export const getJSONFromCSV = async () => {
  const data = await CSVToJSON().fromFile(filePath);
  return data;
};
