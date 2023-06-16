import { api } from "../api/api"
import { reviewTransformer } from "../helpers/reviewTransformer"
import { ReviewPostDTO } from "../types/Review"
import { VideoType } from "../types/Video"

export const handleSaveNewReview = async (video: VideoType, newReview: ReviewPostDTO) => {
  const response = await api.post<string, ReviewPostDTO>(`http://localhost:8080/reviews`, JSON.stringify(newReview))
  return reviewTransformer(newReview)
}
