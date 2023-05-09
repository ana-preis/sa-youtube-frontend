import "./styles.css";
import { SetStateAction, useState } from "react";
import Dropdown from "../Dropdown";

interface SearchBarProps {
  setIsFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
  onClickSearch: (text: any) => any;
  handleOnChangeDropdown: (text: string) => any;
  listType: string;
  styles?: string;
}

const SearchBar = (props: SearchBarProps) => {

  const [inputValue, setInputValue] = useState("");

  const { setIsFilterActive, onClickSearch, handleOnChangeDropdown, listType, styles } = props;

  const handlePesquisar = () => {
    setIsFilterActive(true)
    onClickSearch(inputValue)
  }

  return (
    <div className={`flex-row search-bar ${styles}`}>
      <img src="./log2.svg" alt="logo" className="search-bar-logo" />
      <div className="flex-row search-container">
        <Dropdown
          handleOnChangeDropdown={handleOnChangeDropdown}
        />
        <div className="flex-row search-input">
          <input className="text" onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <a className="btn btn-3" onClick={() => handlePesquisar()}>
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
