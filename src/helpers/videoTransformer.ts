import { CategorySearchType } from "../types/Category";
import { VideoType } from "../types/Video";
import { ResponseType } from "../types/Http";

export const videoUrl = (id: string) => {
  return `https://www.youtube.com/embed/${id}`
}

export const addVideoURL = (res: ResponseType): ResponseType => {
  if(res.status === 200) {
    let data = res.data as VideoType
    data.url = videoUrl(data.id);
  }
  return res;
}

export const addVideoURLToList = (res: ResponseType): ResponseType => {
  if(res.status === 200) {
    let data = res.data as VideoType[]
    data.map((video) => {
        video.url = videoUrl(video.id)
        video.title = decodeHtml(video.title)
    });
    return res;
  }
  return res;
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