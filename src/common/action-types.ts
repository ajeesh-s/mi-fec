import { Author, Category } from "./interfaces";

export type AppAction =
  | {
    type: "SET_CATEGORIES";
    payload: Category[];
  }
  | {
    type: "SET_AUTHORS";
    payload: Author[];
  };
