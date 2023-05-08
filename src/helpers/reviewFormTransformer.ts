import { ReviewPostType, ReviewType } from "../types/Review";
import { VideoType } from "../types/Video";

export const reviewFormTransformer = (video: VideoType, review: ReviewType): ReviewPostType => {
  const date = new Date(video.publishedAt)
  const now = Date.now();
  const reviewDTO = {
    rating: review.rating,
    text: review.text,
    userID: review.userID,
    publishedAt: review.publishedAt
  }
  const videoDTO = {
    id: video.id,
    title: video.title,
    embedHtml: video.embedHtml,
    description: video.description,
    tags: video.tags,
    publishedAt: date.getTime().toString(),
    channelName: video.channelName,
    likeCount: video.likeCount,
    viewCount: video.viewCount,
  }
  const newReviewForm: ReviewPostType = {
    review: reviewDTO,
    video: videoDTO,
  }
  return newReviewForm; 
}