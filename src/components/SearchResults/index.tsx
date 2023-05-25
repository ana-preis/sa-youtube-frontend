import VideoList from "./components/VideoList";
import CategoryList from "./components/CategoryList";
import CategoryListV2 from "./components/CategoryListV2";
import './styles.css'
import { CategorySearchType } from "../../types/Category";

interface SearchResultsProps {
  listType: string;
  data: any;
  searchText?: string;
} 

const SearchResults = (props : SearchResultsProps) => {
  const { listType, data, searchText } = props

  const sortCategories = (): CategorySearchType[] => {
    let list = []
    list = data.sort((a: CategorySearchType, b: CategorySearchType ) => b.videoList.length - a.videoList.length)
    return list; 
  }
    return (
      <div className="search-results-container flex-column">
        {listType === "videos" ? <VideoList videos={data} text={searchText} searchType={listType}/> : <CategoryListV2 categories={sortCategories()}/>}
      </div>
    );
}

export default SearchResults;