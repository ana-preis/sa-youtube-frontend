import { CategorySearchType } from "../types/Category";
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
      video.title = decodeHtml(video.title)
  });
  return response;
}

const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


export const handleSortVideoList = (a: CategorySearchType, b: CategorySearchType) => {
  if (!a.videoDTOList) a.videoDTOList = [];
  if (!b.videoDTOList) b.videoDTOList = [];
  return b.videoDTOList.length - a.videoDTOList.length
}