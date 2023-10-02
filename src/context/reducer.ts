import { AppAction } from "../common/action-types";
import { IAppState } from "../common/state-types";


export const reducer = (state: IAppState, action: AppAction): IAppState => {
  ;
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
