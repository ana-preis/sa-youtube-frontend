import { api } from "../api/api"
import { addVideoURL, addVideoURLToList } from "../helpers/videoTransformer"
import { VideoType } from "../types/Video"
import { ResponseType } from "../types/Http"

export const handleFetchVideoDetails = async (videoId: string | undefined) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/videos/${videoId}`)
  return addVideoURL(response);
}

export const handleFetchVideos = async (text: string | undefined) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/search?q=${text}`)
  return addVideoURLToList(response);
}

export const handleFetchVideosByCategoryID = async (text: string | undefined, id: string) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/videos/category/${id}?text=${text}`)
  return addVideoURLToList(response);
}