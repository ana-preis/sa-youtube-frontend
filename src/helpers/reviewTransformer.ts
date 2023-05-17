import { ReviewPostDTO, ReviewSearchType, ReviewType } from "../types/Review";

export const reviewTransformer = (review: ReviewPostDTO): ReviewType => {
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