import { ReviewType } from "./Review";
import { VideoType } from "./Video";

export interface UserType {
  id: string,
  username: string,
  email: string,
  toWatchList?: VideoType[],
  finishedList?: VideoType[],
  messageList?: string[],
}

export interface UserRequest {
  username: string,
  email: string,
  password: string,
  toWatchList?: VideoType[],
  finishedList?: VideoType[],
  messageList?: string[],
}