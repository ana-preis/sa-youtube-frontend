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