import { useEffect, useState } from 'react';
import { Filter } from '../../types/Filters';
import './styles.css'

interface DropdownProps {
  options: Filter[];
  onChange: (e:string)=>any;
}

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" >
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown = (props : DropdownProps) => {

  const {options, onChange} = props


  const [showMenu, setShowMenu] = useState(false);
  const [selectdFilter, setSelectedFilter] = useState<Filter | null>(options[0]);

  useEffect(() => {
    const handler = () => setShowMenu(false)
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  })

  const handleInputClick = (e :any) => {
    e.stopPropagation();
    setShowMenu(true);
  }

  const getDisplay = () => {
    if (selectdFilter) {
      return selectdFilter.title
    }
    return options[0].title
  }

  const isSelected = (option: Filter) => {
    if(!selectdFilter) {
      return false;
    }
    return selectdFilter.value === option.value
  }

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input flex-row">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tool">
          <Icon/>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {options.map((option: any, index: number) => (
            <div 
              onClick={() => onChange(option.value)} 
              key={index} 
              className={`dropdown-item ${isSelected(option) && "selected"}`}>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;