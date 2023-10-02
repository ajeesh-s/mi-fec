import type { Author } from '../common/interfaces';

export const getAuthors = async (searchText: string = "", signal?: AbortSignal): Promise<Author[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/authors${searchText ? `?q=${searchText}` : ''}`, { signal });
    if (!response.ok) {
      throw new Error('Failed to fetch authors');
    }
    const data = await response.json();
    return data as Author[];
  } catch (error) {
    throw error;
  }
};

export const getAuthor = async (authorId: number): Promise<Author> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/authors/${authorId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch author');
    }
    const data = await response.json();
    return data as Author;
  } catch (error) {
    throw error;
  }
};
