import { VideoType } from "../types/Video";

export const videoUrl = (id: string) => {
  return `https://www.youtube.com/embed/${id}`
}

export const addVideoURL = (video: VideoType): VideoType => {
  video.url = videoUrl(video.id);
  return video;
}

export const addVideoURLToList = (response: VideoType[]): VideoType[] => {
  response.map((video) => {
      video.url = videoUrl(video.id)
  });
  return response;
}