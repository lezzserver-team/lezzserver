import { useContext } from "react";
import { RunFunctionPanelContext } from "../context/run-function-panel-context";

export const useRunFunctionPanel = () => {
  const context = useContext(RunFunctionPanelContext);
  if (!context) {
    throw new Error(
      "useRunFunctionPanel must be used within a ApplicationDashboardLayoutProvider",
    );
  }
  return context;
};
