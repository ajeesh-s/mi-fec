import { AppAction } from "../common/action-types";
import { Category } from "../common/interfaces";


export const setCategories = (categories: Category[]): AppAction => ({
  type: "SET_CATEGORIES",
  payload: categories,
});