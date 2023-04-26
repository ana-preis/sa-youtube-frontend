import { ReviewType, ReviewSearchType } from "../types/Review";

export const reviewGetTransformer = (review: ReviewSearchType, videoId: string): ReviewType => {
  const dateFormat = new Date(review.publishedAt);
  const newReview = {
    id: review.id,
    user: review.userName,
    rating: review.rating,
    videoId: videoId,
    text: review.text,
    userID: review.userId,
    publishedAt: dateFormat.toDateString(),
  }
  return newReview; 
}