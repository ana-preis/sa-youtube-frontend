import VideoList from "./components/VideoList";
import CategoryList from "./components/CategoryList";
import './styles.css'

interface SearchResultsProps {
  listType: string;
  data: any;
  searchText?: string;
} 

const SearchResults = (props : SearchResultsProps) => {
  const { listType, data, searchText } = props

    return (
      <div className="search-results-container flex-column">
        {listType === "videos" ? <VideoList videos={data} text={searchText} searchType={listType}/> : <CategoryList categories={data}/>}
      </div>
    );
}

export default SearchResults;