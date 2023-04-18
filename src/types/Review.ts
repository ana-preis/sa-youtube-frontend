export interface ReviewType {
  id: string;
  user: string;
  publishedAt: string;
  rate: number;
  videoId: string;
  text?: string;
  likeCount?: number;
}