import { ResponseType } from "../types/Http";
import { ReviewPostDTO, ReviewSearchType, ReviewType } from "../types/Review";

export const reviewTransformer = (response: ResponseType, review: ReviewPostDTO): ReviewType => {
  if (response.status !== 201) return response.data as ReviewType;
  const date = new Date(review.publishedAt)
  const newReview: ReviewType = {
    userID: review.userId,
    text: review.text,
    rating: review.rating,
    videoId: review.videoId,
    publishedAt: date.toDateString()
  }
  return newReview; 
}

export const reviewSearchTransformer = (review: ReviewSearchType, videoId: string): ReviewType => {
  const date = new Date(review.publishedAt)
  const newReview: ReviewType = {
    userID: review.userId,
    text: review.text,
    rating: review.rating,
    videoId: videoId,
    publishedAt: date.toDateString()
  }
  return newReview; 
}