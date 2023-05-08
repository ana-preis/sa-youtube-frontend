
import React from "react";
import VideoList from "./components/VideoList";
import CategoryList from "./components/CategoryList";
import './styles.css'

interface SearchResultsProps {
  listType: string;
  data: any;
} 

const SearchResults = (props : SearchResultsProps) => {
  const { listType, data } = props

    return (
      <div className="search-results-container flex-column">
        {listType === "videos" ? <VideoList videos={data}/> : <CategoryList categories={data}/>}
      </div>
    );
}

export default SearchResults;