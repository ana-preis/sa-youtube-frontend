export interface Video {
  id: string;
  name: string;
  url: string;
  publishedAt: string;
  channel: string;
  description?: string;
  viewCount?: number;
  likeCount?: number;
  dislikeCount?: number;
}