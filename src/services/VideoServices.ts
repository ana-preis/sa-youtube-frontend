import { api } from "../api/api"
import { VideoGetType } from "../types/Video"
import { videoTransformer, videoListTransformer } from "../helpers/videoTransformer"

export const handleFetchVideoDetails = async (videoId: string | undefined) => {
  const response = await api.get<VideoGetType>(`http://localhost:8080/videos/${videoId}`)
  return videoTransformer(response)
}

export const handleFetchVideos = async (text: string | undefined) => {
  const response = await api.get<VideoGetType[]>(`http://localhost:8080/search?q=${text}&type=video`)
  return videoListTransformer(response)
}