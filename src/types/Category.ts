import { VideoType } from "./Video";
import { UserOutDTO } from "./User";

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
  userList: UserOutDTO[];
  viewCount?: number;
  videoList: VideoType[];
}

// const toCategoryType = (categorySearch: CategorySearchType): CategoryType => {
//   const newCategory : CategoryType = {
//     id: categorySearch.id
//   } 
// }