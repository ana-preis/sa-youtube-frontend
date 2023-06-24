import { CategorySearchType, CategoryType } from "./Category";
import { ReviewSearchType, ReviewType } from "./Review";
import { VideoType } from "./Video";

export interface UserType {
  username: string;
  email: string;
  password: string;
  id: string;
  toWatchList?: VideoType[];
  finishedList?: VideoType[];
  messageList?: string[];
  subscriptions?: CategoryType[];
  role?: string;
}

export interface UserOutDTO {
  id: string;
  username: string;
  email: string;
  reviewList?: ReviewSearchType[];
  categoryList?: CategorySearchType[];
  subscriptionIDs?: CategoryType[];
}

export interface UserAuth {
  email: string;
  password: string;
  username?: string;
}

export interface TokenAuth {
  accessToken: string;
  refreshToken: string;
  email: string;
}