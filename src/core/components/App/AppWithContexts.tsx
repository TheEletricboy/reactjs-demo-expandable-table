import { memo } from "react";
import { FilterProvider } from "../../contexts/FilterContext";
import { OverlayContextProvider } from "../../contexts/OverlayContext";
import { TableContextProvider } from "../../contexts/TableContext";
import App from "./App";
import Header from "../Header/Header";
import { OverlayContainer } from "../OverlayContainer/OverlayContainer";

const AppWithContexts = () => (
  <OverlayContextProvider>
    <FilterProvider>
      <TableContextProvider>
        <Header/>
        <App />
        <OverlayContainer/>
      </TableContextProvider>
    </FilterProvider>
  </OverlayContextProvider>
);

export default memo(AppWithContexts);
