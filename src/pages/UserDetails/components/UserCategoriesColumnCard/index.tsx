import { MockCategoryList } from "../../../../mocks/MockCategoryList";
import { CategorySearchType, CategoryType } from "../../../../types/Category";
import '../../styles.css'


interface UserCategoriesColumnCardProps {
	categoryList: CategorySearchType[];
}

const UserCategoriesColumnCard = ( props: UserCategoriesColumnCardProps ) => {

	const {categoryList} = props;

	const renderVideoList = (category : CategorySearchType ) => {
		return (
			<>
				<a className="width-100 flex-column ai-center video-thumbnail-container">
					{
            category.videoDTOList && category.videoDTOList.length > 0
            ?
            <>
              <img className="video-thumbnail" src={category.videoDTOList[0].thumbnailUrl}></img>
              <h3 className="related-video-title">{category.name}</h3>
            </>
            :
            <h3 className="related-video-title">{category.name}</h3>
          }
				</a>
			</>
		)
	}

	return (
		<div className="user-categories-container">
				<div className="white-bg flex-column">
					<h2 className="user-categories-title">Suas categorias</h2>
					{ categoryList.length > 0 ?
            categoryList.slice(0, 3).map((c) => renderVideoList(c)) :
            (<span className="no-categories">Ainda não tem categorias aqui!</span>)
          }
			</div>

		</div>
	)
}

export default UserCategoriesColumnCard;