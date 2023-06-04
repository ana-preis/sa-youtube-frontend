import { UserOutDTO } from "../types/User";
import { MockReviewList } from "./MockReviewList"
import { MockCategorySearchList20 } from "./MockCategoryList20";

export const MockUser: UserOutDTO = {
  id: "id-test",
  username: "anapreis",
  email:"anapreis@gmail.com",
  reviewList: MockReviewList,
  categoryList: MockCategorySearchList20
}