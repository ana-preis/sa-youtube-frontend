
import React from "react";
import SearchBar from "../../components/SearchBar";
import VideoList from "./components/VideoList";
import CategoryList from "./components/CategoryList";
import CategoryContainer from "../../components/CategoryContainer";
import PlayList from "./components/PlayList";
import './styles.css'

const SearchResults = () => {

    return (
      <div className="search-results-container flex-column">
        {/* <SearchBar/> */}
        <VideoList/>
      </div>
    );
}

export default SearchResults;