import { DataEntry } from '../components/MasterTable/types';
import parentData from './mockData/parentData.json';
import childData from './mockData/childData.json';

const loadingDelay = 1000;

export const loadParentData = (): Promise<DataEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(parentData), loadingDelay);
  });
};

export const loadChildData = (parentId: string): Promise<DataEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const children = childData.filter((child) => child.parentId === parentId);
      resolve(children);
    }, loadingDelay);
  });
};

export const getUniqueFilterOptions = (): { [key: string]: string[] } => {
  // @TODO make this dynamic.
  const dimensions:  (keyof DataEntry)[] = ["Article", "Region", "LegalEntity", "Version", "Currency", "Measure"];
  // Use only parentData to generate filter options
  const allData = parentData;

  const uniqueOptions: { [key: string]: string[] } = {};

  dimensions.forEach((dimension) => {
    uniqueOptions[dimension] = Array.from(
      new Set(allData.map((entry) => entry[dimension] as string)),
    ).filter(Boolean);
  });

  return uniqueOptions;
};
