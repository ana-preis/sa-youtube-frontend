import { Category } from "./Category";

export interface VideoType {
  id: string;
  name: string;
  url: string;
  publishedAt: string;
  channel: string;
  description?: string;
  viewCount?: number;
  likeCount?: number;
  dislikeCount?: number;
  rate?: number;
}

export interface VideoPostType {
  id: string,
  title: string,
  description: string,
  tags: string[],
  publishedAt: string,
  channelName: string,
  likeCount: number,
  viewCount: number,
}