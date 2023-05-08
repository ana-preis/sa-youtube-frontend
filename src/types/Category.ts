import { VideoType } from "./Video";

export interface CategoryType {
  id: string;
  name: string;
  viewCount?: number;
  description?: string;
  userCount?: number;
  videoCount?: number;
  videoList?: VideoType[];
}