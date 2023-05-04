import { PlayListType } from "./PlayList";
import { ReviewPostType } from "./Review";

export interface VideoType {
  id: string;
  name: string;
  url: string;
  publishedAt: string;
  channel: string;
  embedHtml: string;
  description?: string;
  viewCount?: number;
  likeCount?: number;
  dislikeCount?: number;
  rate?: number;
  thumbnail?: string;
  tags?: string[];
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
  player: Player;
  snippet: Snippet;
  statistics: Statistics;
}

export interface VideoGetType {
  items?: Items[];
  videoDTO?: VideoPostType;
  reviewDTOList?: ReviewPostType[];
  averageRating?: number;
  totalReviews?: number;

}

export interface VideoPostType {
  id: string;
  title: string;
  embedHtml: string;
  description?: string;
  tags?: string[];
  publishedAt: string | number;
  channelName: string;
  likeCount?: number;
  viewCount?: number;
  reviewList?: ReviewPostType[]
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