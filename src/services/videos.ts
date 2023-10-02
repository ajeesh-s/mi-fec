
import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';

export const getVideos = (categories: Category[], authors: Author[]): ProcessedVideo[] => {
  const videoList: ProcessedVideo[] = [];
  authors.forEach((author: Author) => {
    author.videos.forEach((video: Video) => {
      const categoriesArray: string[] = video.catIds.map(catId => {
        const category = categories.find((category: Category) => category.id === catId);
        return category ? category.name : 'Unknown Category';
      });

      let highestQualityFormat = '';
      let highestSize = -1;

      Object.entries(video.formats).forEach(([formatName, formatInfo]) => {
        const { res, size } = formatInfo;

        if (size > highestSize || (size === highestSize && res > highestQualityFormat.split(' ')[1])) {
          highestQualityFormat = `${formatName} ${res}`;
          highestSize = size;
        }
      });

      videoList.push({
        id: video.id,
        name: video.name,
        author: { id: author.id, name: author.name },
        categories: categoriesArray,
        highestQualityFormat: highestQualityFormat,
        releaseDate: video.releaseDate as string,
      });
    });
  });
  return videoList;
};

export const getVideo = async (authorId: number, videoId: number): Promise<Video> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/authors/${authorId}`);
    if (!response.ok) {
      throw new Error('Failed to get videos for author');
    }
    const author = await response.json() as Author;
    const video = author.videos.find((v: Video) => v.id === videoId);
    if (!video) {
      throw new Error('Video not found');
    }
    return video;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};


export const inserUpdateVideoByAuthor = async (author: Author) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/authors/${author.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });

    if (!response.ok) {
      throw new Error("Failed to update video");
    }
    return await response.json();;
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
}