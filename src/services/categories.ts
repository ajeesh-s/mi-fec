import { Category } from "../common/interfaces";


export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data as Category[];
  } catch (error) {
    throw error;
  }
};