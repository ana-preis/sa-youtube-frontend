import { MockCategoryList } from "../../../../mocks/MockCategoryList";
import { CategorySearchType, CategoryType } from "../../../../types/Category";
import '../../styles.css'


interface UserCategoriesColumnCardProps {
	caetgoryList: CategorySearchType[];
}

const UserCategoriesColumnCard = ( props: UserCategoriesColumnCardProps ) => {

	const {caetgoryList} = props;

	const renderVideoList = (category : CategoryType ) => {
		return (
			<>
				<a className="width-100 flex-column ai-center video-thumbnail-container">
					<img className="video-thumbnail" src={category.videoDTOList[0].thumbnailUrl}></img>
				</a>
				<h3 className="related-video-title">{category.videoDTOList[0].title}</h3>
			</>
		)
	}

	return (
		<div className="user-categories-container">
				<div className="white-bg flex-column">
					<h2 className="user-categories-title">Suas categorias</h2>
					{MockCategoryList.slice(0, 3).map((c) => renderVideoList(c))}
			</div>

		</div>
	)
}

export default UserCategoriesColumnCard;