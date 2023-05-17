import { VideoType } from "./Video";

export interface UserType {
  username: string;
  email: string;
  password: string;
  id?: string;
  toWatchList?: VideoType[];
  finishedList?: VideoType[];
  messageList?: string[];
}

export interface UserOutDTO {
  id: string;
  username: string;
  email: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface TokenAuth {
  token: string;
}