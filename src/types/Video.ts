import { PlayListType } from "./PlayList";
import { ReviewPostType } from "./Review";

export interface VideoType {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  channelName: string;
  embedHtml?: string;
  description?: string;
  viewCount?: number;
  likeCount?: number;
  dislikeCount?: number;
  rate?: number;
  thumbnail?: string;
  tags?: string[];
  reviewList?: ReviewPostType[]
}

interface Player {
  embedHtml: string;
}

interface Thumbnails {
  medium: { url: string };
}

interface Snippet {
  channelTitle: string;
  title: string;
  description: string;
  publishedAt: { value: number };
  tags: string[];
  thumbnails: Thumbnails;
}

interface Statistics {
  likeCount: number;
  viewCount: number;
}

interface Items {
  id: string;
  player?: Player;
  snippet: Snippet;
  statistics?: Statistics;
}

export interface VideoGetType {
  items?: Items[];
  videoDTO?: VideoType;
  reviewDTOList?: ReviewPostType[];
  averageRating?: number;
  totalReviews?: number;

}

export interface VideoPostType {
  id: string;
  title: string;
  embedHtml?: string;
  description?: string;
  tags?: string[];
  publishedAt: string | number;
  channelName: string;
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
  channelName: string;
  likeCount: number;
  viewCount: number;
  userToWatch?: VideoType[];
  userFinishedList?: VideoType[];
  playlist?: PlayListType[];
}