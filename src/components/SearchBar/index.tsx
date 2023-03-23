import './styles.css'

const SearchBar = () => {
    return (
        <div className="flex-row search-bar">
            <img src="./log2.svg" alt="logo" className="search-bar-logo"/>
            <div className="flex-row search-container">
                <a href="" className="btn btn-3">Pesquisar</a>
                <div className="flex-row search-input">
                    <input className="text"/>
                    <img src="./icon-search.svg" alt="icon-search" className="icon-search"/>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;