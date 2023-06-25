import { api } from "../api/api"
import { reviewTransformer } from "../helpers/reviewTransformer"
import { ReviewPostDTO } from "../types/Review"
import { VideoType } from "../types/Video"

export const handleSaveNewReview = async (video: VideoType, newReview: ReviewPostDTO) => {
  const response = await api.post<string, ResponseType>(`http://localhost:8080/reviews`, JSON.stringify(newReview))
  return response;
}

export const handleEditReview = async (review: ReviewPostDTO) => {
  const response = await api.put<string, ResponseType>(`http://localhost:8080/reviews`, JSON.stringify(review))
  return response;
}

export const handleDeleteReview = async (review: ReviewPostDTO) => {
  const response = await api.delete<string, ResponseType>(`http://localhost:8080/reviews`, JSON.stringify(review))
  return response;
}