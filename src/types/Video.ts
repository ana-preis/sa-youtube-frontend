import { PlayListType } from "./PlayList";
import { ReviewSearchType } from "./Review";

export interface VideoType {
  id: string;
  title: string;
  embedHtml: string;
  thumbnailUrl: string;
  description: string;
  tags?: string[];
  publishedAt: string;
  channelTitle: string;
  likeCount: number;
  viewCount: number;
  reviewCount?: number;
  averageRating?: number;
  reviews?: ReviewSearchType[];
  categoryIDList?: string[];
  url?: string;
}

export interface VideoPostType {
  id: string;
  title: string;
  embedHtml?: string;
  description?: string;
  tags?: string[];
  publishedAt: string | number;
  channelTitle: string;
  likeCount?: number;
  viewCount?: number;
  thumbnail?: string;
}

export interface VideoReviewDTO {
  id: string;
  categoryList?: string[];
  title: string;
  embedHtml: string;
  description: string;
  tags: string[];
  publishedAt: {value: number};
  channelTitle: string;
  likeCount: number;
  viewCount: number;
  userToWatch?: VideoType[];
  userFinishedList?: VideoType[];
  playlist?: PlayListType[];
}
