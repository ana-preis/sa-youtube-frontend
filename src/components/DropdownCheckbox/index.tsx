import React, { useState } from "react";
import { CategoryType } from "../../types/Category";
import './styles.css'

interface DropdownCheckboxProps {
  options: CategoryType[]
  setCategory: React.Dispatch<React.SetStateAction<string[]>>
}

const DropdownCheckbox = (props: DropdownCheckboxProps) => {
  const { options } = props;

  const mountList = (): {key: string, value: string}[] => {
    let categories: {key: string, value: string}[] = [];
    options.map((category) => {
      categories = categories.concat( { key: category.id, value: category.name } )
    })
    return categories;
  }

  const [list, setList] = useState(mountList());
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setCheckedItems((prevCheckedItems) =>
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
              value={item.value}
              checked={checkedItems.includes(item.value)}
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
