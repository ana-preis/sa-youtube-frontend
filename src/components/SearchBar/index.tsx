import "./styles.css";
import { searchDropdownItems } from "../../helpers/searchDropdownItems";
import { MouseEventHandler, useState } from "react";
import Dropdown from "../Dropdown";

interface SearchBarProps {
  onSearch: (text: string) => MouseEventHandler<HTMLAnchorElement>;
  handleOnChangeDropdown: (text: string) => any;
}

const SearchBar = (props: SearchBarProps) => {

  const [inputValue, setInputValue] = useState("");

  const { onSearch, handleOnChangeDropdown } = props;

  return (
    <div className="flex-row search-bar">
      <img src="./log2.svg" alt="logo" className="search-bar-logo" />
      <div className="flex-row search-container">
        <Dropdown
          options={searchDropdownItems}
          onChange={handleOnChangeDropdown}
        />
        <div className="flex-row search-input">
          <input className="text" onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <a href="" className="btn btn-3" onClick={onSearch(inputValue)}>
          Pesquisar
          <img
            src="./icon-search.svg"
            alt="icon-search"
            className="icon-search"
          />
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
