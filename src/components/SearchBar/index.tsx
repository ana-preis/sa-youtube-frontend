import './styles.css'
import { searchDropdownItems } from '../../helpers/searchDropdownItems';
import { useState } from 'react';
import Dropdown from '../Dropdown';

const SearchBar = () => {

  const handleOnChangeDropdown = () => {
    return null;
  }
  
    return (
        <div className="flex-row search-bar">
            <img src="./log2.svg" alt="logo" className="search-bar-logo"/>
            <div className="flex-row search-container">
                <Dropdown placeholder="Filtros" options={searchDropdownItems} onChange={handleOnChangeDropdown}/>
                <div className="flex-row search-input">
                    <input className="text"/>
                </div>
                <a href="" className="btn btn-3">
                  Pesquisar                  
                  <img src="./icon-search.svg" alt="icon-search" className="icon-search"/>
                </a>
            </div>
        </div>
    )
}

export default SearchBar;