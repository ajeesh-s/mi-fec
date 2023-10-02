import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AppAction } from "../common/action-types";
import { IAppState } from "../common/state-types";
import { reducer } from "./reducer";


const initialState: IAppState = { categories: [] };

export const AppContext = createContext<{
  state: IAppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
