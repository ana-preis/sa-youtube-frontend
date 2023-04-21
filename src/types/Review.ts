import { VideoPostType } from "./Video";

export interface ReviewType {
  id: string;
  user: string;
  publishedAt: string;
  rating: number;
  videoId: string;
  text?: string;
  likeCount?: number;
}

export interface ReviewPostType {
  rating: number;
  text: string;
  userID: string;
  video: VideoPostType
}