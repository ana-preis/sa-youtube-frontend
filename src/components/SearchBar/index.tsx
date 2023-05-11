import "./styles.css";
import { SetStateAction, useState } from "react";
import Dropdown from "../Dropdown";

interface SearchBarProps {
  setIsFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
  onClickSearch: (text: any, listType: any) => any;
  listType: string;
  styles?: string;
  isDropdownVisible?: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const { setIsFilterActive, onClickSearch, listType, styles, isDropdownVisible } = props;

  const [inputValue, setInputValue] = useState("");
  const [listTypeValue, setListTypeValue] = useState(listType)


  const handlePesquisar = () => {
    setIsFilterActive(true)
    onClickSearch(inputValue, listTypeValue)
  }
  
  const handleOnChangeDropdown = (type: string): any => {
    setListTypeValue(type);
  }

  return (
    <div className={`flex-row search-bar ${styles}`}>
      <img src="./log2.svg" alt="logo" className="search-bar-logo" />
      <div className="flex-row search-container">
        {isDropdownVisible && handleOnChangeDropdown &&
          <Dropdown
            handleOnChangeDropdown={handleOnChangeDropdown}
          />
        }
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
