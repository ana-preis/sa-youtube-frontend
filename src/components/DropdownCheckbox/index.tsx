import React, { useEffect, useState } from "react";
import { CategorySearchType, CategoryType } from "../../types/Category";
import './styles.css'

interface DropdownCheckboxProps {
  options: CategorySearchType[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  savedCategories: string[];
}

const DropdownCheckbox = (props: DropdownCheckboxProps) => {
  const { options, setCategory, savedCategories } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [disabledItems, setDisabledItems] = useState<string[]>([])


  useEffect(() => {
    if(savedCategories.length > 0) {
      setCheckedItems(savedCategories)
      setCategory(savedCategories)
      setDisabledItems(savedCategories)
    }
  }, [])

  const mountList = (): {key: string, value: string}[] => {
    let categories: {key: string, value: string}[] = [];
    options.map((category) => {
      categories = categories.concat( { key: category.id, value: category.name } )
    })
    return categories;
  }

  const [list, setList] = useState(mountList());


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
      setCategory((prevCheckedItems) => [...prevCheckedItems, value])
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
      setCategory((prevCheckedItems) =>
      prevCheckedItems.filter((item) => item !== value)
      );
    }
  };

  return (
    <div className="dropdown-checkbox" data-control="checkbox-dropdown">

      <div className="dropdown-list">

        {list.map((item) => (
          <label key={item.key} className="dropdown-option">
            <input
              type="checkbox"
              name="dropdown-group"
              value={item.key}
              checked={checkedItems.includes(item.key)}
              onChange={handleCheckboxChange}
              className="checkbox"
              disabled={disabledItems.includes(item.key)}
            />
            {item.value}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckbox;
