import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DataEntry, TTableData } from "../components/MasterTable/types";
import { loadParentData } from "../api/dataService";

type TTableElement = {
  tableData: DataEntry[];
  columnData: string[];
  isLoading: boolean;
} | null;

export const TableContext = createContext<TTableElement>(null);

export const TableContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TTableData | null>(null);

  // Initial Data fetch
  useEffect(() => {
    console.log("----FETCHING ParentRows");

    setIsLoading(true);
    // just mimic fetching. It has a delay :D
    const fetch = async() => {
      await loadParentData().then((parentData) => {
        // Since we're using `import` module syntax it auto parses json.
        // if this was a https request we'd use JSON.parse(parentData).
        setData(parentData);
        setIsLoading(false);
      });
    };
    fetch();

    return () => {
      setIsLoading(false);
    };
  }, []);

  const value = useMemo(() => ({
    isLoading,
    tableData: data?.parentRows || [],
    columnData: data?.tableColumns || [],
  }), [data, isLoading]);
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
