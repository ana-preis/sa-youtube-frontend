import { api } from "../api/api"
import { addVideoURL, addVideoURLToList } from "../helpers/videoTransformer"
import { VideoType } from "../types/Video"

export const handleFetchVideoDetails = async (videoId: string | undefined) => {
  const response = await api.get<VideoType>(`http://localhost:8080/videos/${videoId}`)
  console.log(response)
  return addVideoURL(response);
}

export const handleFetchVideos = async (text: string | undefined) => {
  const response = await api.get<VideoType[]>(`http://localhost:8080/search?q=${text}&type=video`)
  return addVideoURLToList(response);
}

export const handleFetchVideosByCategoryID = async (text: string | undefined, id: string) => {
  const response = await api.get<VideoType[]>(`http://localhost:8080/videos/category/${id}?text=${text}`)
  return addVideoURLToList(response);
}