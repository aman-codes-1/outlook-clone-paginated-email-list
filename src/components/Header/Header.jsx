import { useState } from "react";
import "./Header.css";

const Header = () => {
  const headerItems = [
    { title: "Unread", selected: false },
    { title: "Read", selected: false },
    { title: "Favorites", selected: false },
  ];
  const [state, setState] = useState(headerItems);

  const handleClick = (_, i) => {
    const arrCopy = [...headerItems];
    arrCopy[i].selected = true;
    setState(arrCopy);
  };

  return (
    <div className="header">
      <div>Filter By:</div>
      <div className="header-items">
        {state.map((headerItem, i) => (
          <div
            className={`header-item ${
              headerItem.selected === true ? "header-item-selected" : ""
            }`}
            onClick={(_) => handleClick(_, i)}
          >
            {headerItem.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
