import { ReviewType } from "./Review";
import { VideoType } from "./Video";

export interface UserType {
  id: string,
  name: string,
  email: string,
  toWatchList?: VideoType[],
  finishedList?: VideoType[],
  messageList?: string[],
}