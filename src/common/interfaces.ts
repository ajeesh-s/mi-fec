export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: Record<string, { res: string; size: number }>;
  releaseDate: string;
  authorId?: number;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: { id: number; name: string };
  categories: string[];
  highestQualityFormat: string;
  releaseDate: string;
}