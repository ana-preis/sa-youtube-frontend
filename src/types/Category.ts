import { VideoType } from "./Video";
import { UserType } from "./User";

export interface CategoryType {
  id: string;
  name: string;
  description?: string;
  userCount?: number;
  videoCount?: number;
  viewCount?: number;
  videoDTOList: VideoType[];
}

export interface CategorySearchType {
  id: string;
  name: string;
  description?: string;
  userList: UserType[];
  viewCount?: number;
  videoList: VideoType[];
}