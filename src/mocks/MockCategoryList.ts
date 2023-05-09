import { CategoryType } from "../types/Category";
import { MockVideoList } from "./MockVideoList";

export const MockCategoryList: CategoryType[] = [
  {
    id: "test-id",
    name: "Frontend",
    videoList: MockVideoList,
    viewCount: 21989,
  },
  {
    id: "test-id",
    name: "Backend",
    videoList: MockVideoList,
    viewCount: 21989,
  },
  {
    id: "test-id",
    name: "Tutoriais",
    videoList: MockVideoList,
    viewCount: 21989,
  },
  {
    id: "test-id",
    name: "Inteligencia Artificial",
    videoList: MockVideoList,
    viewCount: 21989,
  },
];

export const MockCategory: CategoryType = {
  id: "test-id",
  name: "Frontend",
  description: "Frontend videos for studying",
  videoList: MockVideoList,
  viewCount: 21989,
}