import { ReviewType, ReviewGetType } from "../types/Review";

export const reviewGetTransformer = (review: ReviewGetType): ReviewType => {
  const newReview = {
    id: review.id,
    user: review.user.name,
    rating: review.rating,
    videoId: review.video.id,
    text: review.text,
    userID: review.user.id,
    publishedAt: review.publishedAt,
  }
  return newReview; 
}