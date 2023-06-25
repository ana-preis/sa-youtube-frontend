import { VideoType } from "./Video";
import { UserOutDTO } from "./User";

export interface CategoryType {
  id: string;
  name: string;
  description?: string;
  userCount?: number | null;
  videoCount?: number | null;
  viewCount?: number | null;
  videoDTOList: VideoType[] | null;
}

export interface CategorySearchType {
  id: string;
  name: string;
  description?: string;
  userList: UserOutDTO[];
  viewCount?: number;
  videoCount?: number;
  videoDTOList?: VideoType[];
}
