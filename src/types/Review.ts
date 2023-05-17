import { UserType } from "./User";
import { VideoReviewDTO } from "./Video";

export interface ReviewType {
  id?: string;
  publishedAt: string;
  rating: number;
  videoId: string;
  userID: string;
  text?: string;
  likeCount?: number;
}

export interface ReviewPostDTO {
  userId: string;
  videoId: string;
  rating: number;
  text: string;
  publishedAt: number;
}

export interface ReviewGetType {
  id?: string;
  text?: string;
  user: UserType;
  rating: number;
  video: VideoReviewDTO;
  publishedAt: string;
}

export interface ReviewSearchType {
  id?: string;
  text?: string;
  userId: string;
  userName: string;
  rating: number;
  publishedAt: number;
  publishedAtString?: string
}