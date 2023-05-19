import { CategoryType } from "../types/Category";
import { MockVideoList } from "./MockVideoList";

export const MockCategoryList: CategoryType[] = [
  {
    id: "test-id",
    name: "Frontend",
    videoDTOList: MockVideoList,
    viewCount: 21989,
  },
  {
    id: "test-id",
    name: "Backend",
    videoDTOList: MockVideoList,
    viewCount: 21989,
  },
  {
    id: "test-id",
    name: "Tutoriais",
    videoDTOList: MockVideoList,
    viewCount: 21989,
  },
  {
    id: "test-id",
    name: "Inteligencia Artificial",
    videoDTOList: MockVideoList,
    viewCount: 21989,
  },
];

export const MockCategory: CategoryType = {
  id: "test-id",
  name: "Frontend",
  description: "Frontend videos for studying, lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun",
  videoDTOList: MockVideoList,
  viewCount: 21989,
}