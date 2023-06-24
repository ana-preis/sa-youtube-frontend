import { CategorySearchType, CategoryType } from "./Category";
import { ReviewPostDTO, ReviewType, ReviewSearchType } from "./Review";
import { TokenAuth, UserOutDTO, UserType } from "./User";
import { VideoType } from "./Video";

export interface RequestInit {
  method?: string | undefined;
  headers?: HeadersInit | undefined;
  mode?: RequestMode | undefined;
}

export interface ResponseType {
  status: number;
  data: UserOutDTO | UserType | VideoType | VideoType[] | ReviewPostDTO | ReviewSearchType[] | CategoryType | CategoryType[] | CategorySearchType[] | CategorySearchType | TokenAuth | ErrorResponse| ReviewType | null;
}

export interface ErrorResponse {
  field: string;
  msg: string;
}