import { CategorySearchType, CategoryType } from "./Category";
import { ReviewSearchType, ReviewType } from "./Review";
import { VideoType } from "./Video";

export interface UserType {
  username: string;
  email: string;
  password: string;
  id?: string;
  toWatchList?: VideoType[];
  finishedList?: VideoType[];
  messageList?: string[];
  subscriptions?: CategoryType[];
}

export interface UserOutDTO {
  id: string;
  username: string;
  email: string;
  reviewList?: ReviewSearchType[];
  categoryList?: CategorySearchType[]
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface TokenAuth {
  accessToken: string;
  refreshToken: string;
  email: string;
  id: string;
}