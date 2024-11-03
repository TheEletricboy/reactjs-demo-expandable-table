import { DataEntry, TTableData } from '../components/MasterTable/types';
import parentData from './mockData/parentData.json';
import childData from './mockData/childData.json';

const loadingDelay = 1000;

export const loadParentData = (): Promise<TTableData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(parentData), loadingDelay);
  });
};

export const loadChildData = (parentId: string): Promise<DataEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // The delay here is to mimic an over the network fetch.
      const children = childData.filter((child) => child.parentId === parentId);
      resolve(children);
    }, loadingDelay);
  });
};

export const getUniqueFilterOptions = (tableColumns: TTableData['tableColumns'], parentRowsData: TTableData['parentRows']): { [key: string]: string[] } => {
  const uniqueOptions: { [key: string]: string[] } = {};
  tableColumns.forEach((dimension) => {
    uniqueOptions[dimension] = Array.from(
      new Set(parentRowsData.map((entry) => entry[dimension as keyof DataEntry] as string)),
    ).filter(Boolean);
  });

  return uniqueOptions;
};
