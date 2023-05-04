import { api } from "../api/api"
import { VideoGetType } from "../types/Video"
import { videoTransformer } from "../helpers/videoTransformer"

export const handleFetchVideoDetails = async (videoId: string | undefined) => {
  const response = await api.get<VideoGetType>(`http://localhost:8080/videos/${videoId}`)
  return videoTransformer(response)
}