import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DataEntry, TTableData } from "../components/MasterTable/types";
import { loadParentData } from "../api/dataService";

type TTableElement = {
  tableData: DataEntry[];
  columnData: string[];
  isLoading: boolean;
  fetchTableData: () => void;
  toggleStyle: () => void;
  isZebraStyle: boolean;
} | null;

export const TableContext = createContext<TTableElement>(null);

export const TableContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableStyle, setTableStyle] = useState('');
  const [data, setData] = useState<TTableData | null>(null);

  const fetchTableData = useCallback(async() => {
    console.info("----FETCHING ParentRows");
    setIsLoading(true);
    await loadParentData().then((parentData) => {
      // Since we're using `import` module syntax it auto parses json.
      // if this was a https request we'd use JSON.parse(parentData).
      setData(parentData);
      setIsLoading(false);
    },
    );
  }, []);

  const toggleTableStyle = useCallback(() => setTableStyle(prev => prev === 'zebra' ? '' : 'zebra'), []);
  const isZebraStyle = useMemo(() => tableStyle === 'zebra', [tableStyle]);

  const value = useMemo(() => ({
    isLoading,
    tableData: data?.parentRows || [],
    columnData: data?.tableColumns || [],
    fetchTableData,
    toggleStyle: toggleTableStyle,
    isZebraStyle,
  }), [isLoading, data?.parentRows, data?.tableColumns, fetchTableData, toggleTableStyle, isZebraStyle]);
  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within an OverlayProvider");
  }
  return context;
};
