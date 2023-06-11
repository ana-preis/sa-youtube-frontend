import { UserOutDTO, UserType } from "../types/User";
import { MockReviewList } from "./MockReviewList"
import { MockCategorySearchList20 } from "./MockCategoryList20";
import { MockVideoList } from "./MockVideoList";

export const MockUser: UserOutDTO = {
  id: "id-test",
  username: "anapreis",
  email:"anapreis@gmail.com",
  reviewList: MockReviewList,
  categoryList: MockCategorySearchList20
}

export const MockUserType: UserType = {
  id: "id-test",
  username: "anapreis",
  email:"anapreis@gmail.com",
  password:"123456",
  subscriptions: [
    {
      id: "05098440-0051-4046-8834-a24c9b0dbb97",
      name: "Tutoriais",
      videoDTOList: MockVideoList
    }
  ]
}