import { VideoType } from "./Video";

export interface PlayListType {
  id: string;
  name: string;
  url: string;
  publishedAt: string;
  channel: string;
  description?: string;
  totalViewCount?: number;
  videoList: VideoType[];
}