import { useState } from "react";
import { UserOutDTO } from "../../types/User";
import { useLoaderData } from "react-router-dom";
import './styles.css'
import ReviewContainer from "../../components/ReviewContainer";
import UserDetailCard from "./components/UserDetailCard";
import UserCategoriesColumnCard from "./components/UserCategoriesColumnCard";

const UserDetails = () => {
  const userLoader: UserOutDTO = useLoaderData() as UserOutDTO;



	return (
		<>
			<div className="breadcrumb">
				Breadcrumb - Breadcrumb
			</div>
			<div className="user-detail flex-row">
				<UserDetailCard user={userLoader}/>
				<UserCategoriesColumnCard caetgoryList={userLoader.categoryList ?? []} />
			</div>
			<ReviewContainer reviewList={userLoader.reviewList ?? []}/>
		</>
	)
}

export default UserDetails;