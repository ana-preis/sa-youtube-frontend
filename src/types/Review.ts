import { UserType } from "./User";
import { VideoPostType, VideoReviewDTO } from "./Video";

export interface ReviewType {
  id?: string;
  user: string;
  publishedAt: string;
  rating: number;
  videoId: string;
  userID: string;
  text?: string;
  likeCount?: number;
}

export interface ReviewDTO {
  rating: Number;
  text?: string;
  userID: string;
  publishedAt: string;
}

export interface ReviewPostType {
  review: ReviewDTO;
  video: VideoPostType;
}

export interface ReviewGetType {
  id?: string;
  text?: string;
  user: UserType;
  rating: number;
  video: VideoReviewDTO;
  publishedAt: string;
}