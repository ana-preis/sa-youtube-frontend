
import React from "react";
import SearchBar from "../../components/SearchBar";
import VideoList from "./components/VideoList";
import './styles.css'

const SearchResults = () => {
    return (
      <>
        <SearchBar/>
        <VideoList/>
      </>
    );
}

export default SearchResults;