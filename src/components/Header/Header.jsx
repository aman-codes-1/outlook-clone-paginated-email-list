import { useState } from "react";
import { TablePagination } from "@mui/material";
import "./Header.css";

const Header = ({ state, pageIndex, handleChangePage }) => {
  const items = [
    { title: "Unread", selected: false },
    { title: "Read", selected: false },
    { title: "Favorites", selected: false },
  ];
  const [headerItems, setHeaderItems] = useState(items);

  const handleClick = (_, i) => {
    const arrCopy = [...items];
    arrCopy[i].selected = true;
    setHeaderItems(arrCopy);
  };

  return (
    <div className="header">
      <div>Filter By:</div>
      <div className="header-items">
        {headerItems.map((headerItem, i) => (
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
      <TablePagination
        component="div"
        count={state?.totalCount}
        page={pageIndex - 1}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
        sx={{ width: "fit-content", marginLeft: "auto" }}
      />
    </div>
  );
};

export default Header;
