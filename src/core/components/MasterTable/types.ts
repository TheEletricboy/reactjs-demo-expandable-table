export type DimensionElement = {
  id: string;
  name: string;
  parentId?: string;
}

// This could eventually be `[key: string]: string` but let's assume we know exactly
// what the mock api would return.
export type DataEntry = {
  id: string;
  Article: string;
  Region: string;
  LegalEntity: string;
  Version: string;
  Currency: string;
  Measure: string;
  Value: number;
}

export type Dimensions = {
  [key: string]: DimensionElement[];
}

export type Filters = {
  [dimension: string]: string[];
}
