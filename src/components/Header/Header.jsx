import { useContext } from "react";
import { TablePagination } from "@mui/material";
import "./Header.css";
import { DataContext } from "../../contexts";

const Header = ({ handleChangePage }) => {
  const {
    dataFilters,
    filter,
    pageIndex,
    emails,
    setDataFilters,
    setEmailCard,
    setFilter,
    totalCount,
  } = useContext(DataContext);

  const handleClick = (_, i, title) => {
    setEmailCard(false);
    const copyDataFilters = [...dataFilters];
    copyDataFilters.forEach((el, idx) => {
      if (i === idx) {
        el.selected = true;
        const emailIds = emails.map((el) => el?.id);
        if (title === "Unread") {
          const unreadEmails = dataFilters[0].data.filter(
            (el) => !emailIds.includes(el?.id)
          );
          el.data = unreadEmails;
          // el.totalCount = dataFilters[0].totalCount - emailIds.length;
        } else if (title === "Read") {
          const readMails = dataFilters[0].data.filter((el) =>
            emailIds.includes(el?.id)
          );
          el.data = readMails;
          // const unreadEmailsCount = dataFilters[0].totalCount - emailIds.length;
          // el.totalCount = dataFilters[0].totalCount - unreadEmailsCount;
        } else if (title === "Favorites") {
          const favoriteEmails = emails
            .filter((el) => el.favorite === true)
            .map((el) => el?.id);
          el.data = dataFilters[0].data.filter((el) =>
            favoriteEmails?.includes(el?.id)
          );
          // el.totalCount = dataFilters[0].totalCount - favoriteEmails.length;
        }
      } else {
        el.selected = false;
      }
    });
    setDataFilters(copyDataFilters);
    setFilter(title);
  };

  return (
    <div className="header">
      <div>Filter By:</div>
      <div className="header-items">
        {dataFilters.map((dataFilter, i) => (
          <div
            className={`header-item ${
              dataFilter.selected === true ? "header-item-selected" : ""
            }`}
            onClick={(_) => handleClick(_, i, dataFilter.title)}
          >
            {dataFilter.title}
          </div>
        ))}
      </div>
      {filter === "All" ? (
        <TablePagination
          component="div"
          count={totalCount}
          page={pageIndex - 1}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
          sx={{ width: "fit-content", marginLeft: "auto" }}
        />
      ) : (
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          labelDisplayedRows={() => ""}
          nextIconButtonProps={{ style: { display: "none" } }}
          backIconButtonProps={{ style: { display: "none" } }}
          sx={{ width: "fit-content", marginLeft: "auto" }}
        />
      )}
    </div>
  );
};

export default Header;
