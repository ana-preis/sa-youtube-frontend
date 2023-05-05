import SearchBar from "../SearchBar";
import CategoryContainer from "../CategoryContainer";
import "./styles.css";
import { MouseEventHandler } from "react";

interface RowCategoryProps {
  onSearch: (text: string) => MouseEventHandler<HTMLAnchorElement>;
  handleOnChangeDropdown: (text: string) => any;
}

const RowCategory = (props: RowCategoryProps) => {
  const { onSearch, handleOnChangeDropdown } = props;

  return (
    <>
      <SearchBar onSearch={onSearch} handleOnChangeDropdown={handleOnChangeDropdown} />
      <CategoryContainer />
    </>
  );
};

export default RowCategory;
