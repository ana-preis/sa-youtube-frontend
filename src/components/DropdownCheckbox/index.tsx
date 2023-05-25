import React, { useState } from "react";
import { CategoryType } from "../../types/Category";
import './styles.css'

interface DropdownCheckboxProps {
  options: CategoryType[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  savedCategories: CategoryType[];
}

const DropdownCheckbox = (props: DropdownCheckboxProps) => {
  const { options, setCategory, savedCategories } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const mountList = (): {key: string, value: string}[] => {
    let categories: {key: string, value: string}[] = [];
    options.map((category) => {
      categories = categories.concat( { key: category.id, value: category.name } )
    })
    if(savedCategories.length > 0) {
      // implementar checked 
    }
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
            />
            {item.value}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckbox;
