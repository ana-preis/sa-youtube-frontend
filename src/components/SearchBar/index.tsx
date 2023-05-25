import "./styles.css";
import { SetStateAction, useState } from "react";
import Dropdown from "../Dropdown";

interface SearchBarProps {
  onClickSearch: (text: any, listType: any) => any;
  listType: string;
  styles?: string;
  isDropdownVisible?: boolean;
  placeholder?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { onClickSearch, listType, styles, isDropdownVisible, placeholder } = props;

  const [inputValue, setInputValue] = useState("");
  const [listTypeValue, setListTypeValue] = useState(listType)


  const handlePesquisar = () => {
    onClickSearch(inputValue, listTypeValue)
  }
  
  const handleOnChangeDropdown = (type: string): any => {
    setListTypeValue(type);
  }

  
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onClickSearch(inputValue, listTypeValue)
    }
  };

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
          <input 
            className="text"
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder={placeholder} 
            onKeyDown={handleKeyDown}
          />
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
