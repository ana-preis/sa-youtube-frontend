import { Category } from "./Category";
import { PlayListType } from "./PlayList";

export interface VideoType {
  id: string;
  name: string;
  url: string;
  publishedAt: string;
  channel: string;
  embedHtml: string;
  description?: string;
  viewCount?: Number;
  likeCount?: Number;
  dislikeCount?: number;
  rate?: number;
  thumbnail?: string;
  tags?: string[];
}

interface Player {
  embedHtml: string;
}

interface Thumbnails {
  medium: { url: string }
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
  likeCount: Number;
  viewCount: Number;
}

interface Items {
  id: string;
  player: Player;
  snippet: Snippet;
  statistics: Statistics;
}

export interface VideoGetType {
  items: Items[]
}

export interface VideoPostType {
  id: string;
  title: string;
  embedHtml: string;
  description?: string;
  tags?: string[];
  publishedAt: string;
  channelName: string;
  likeCount?: Number;
  viewCount?: Number;
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
  userToWatch?: VideoType[],
  userFinishedList?: VideoType[],
  playlist?: PlayListType[];
}