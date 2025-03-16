import { createContext, useEffect, useState } from "react";
import { callApi } from "../../helpers";
import { Loader } from "../../components";

export const DataContext = createContext({
  data: [],
  dataFilters: [],
  emailCard: false,
  emails: [],
  error: "",
  filter: "",
  filters: [],
  loading: false,
  loadingComp: false,
  pageIndex: 0,
  setDataFilters: () => null,
  setEmailCard: () => null,
  setEmails: () => null,
  setFilter: () => null,
  setPageIndex: () => null,
  setState: () => null,
  totalCount: 0,
});

const DataProvider = ({ children }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [state, setState] = useState({
    loading: true,
    loadingComp: false,
    error: "",
  });
  const filters  = [
    { title: "All", selected: true, data: [], totalCount: 0 },
    { title: "Unread", selected: false, data: [], totalCount: 0 },
    { title: "Read", selected: false, data: [], totalCount: 0 },
    { title: "Favorites", selected: false, data: [], totalCount: 0 },
  ];
  const [dataFilters, setDataFilters] = useState(filters);
  const [emails, setEmails] = useState([]);
  const [filter, setFilter] = useState(dataFilters[0].title);
  const [emailCard, setEmailCard] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setState((prev) => ({
        ...prev,
        loadingComp: true,
        error: "",
      }));
      try {
        const data = await callApi({
          method: "GET",
          url: `https://flipkart-email-mock.now.sh/?page=${pageIndex}`,
        });
        setState({
          loading: false,
          loadingComp: false,
          error: "",
        });
        const copyDataFilters = [...dataFilters];
        copyDataFilters.forEach((el, idx) => idx !== 0 ? el.selected = false : el.selected = true);
        copyDataFilters[0].data = data?.data?.list;
        copyDataFilters[0].totalCount = data?.data?.total;
        setDataFilters(copyDataFilters);
      } catch (err) {
        setState({
          loading: false,
          loadingComp: false,
          error: JSON.stringify(err),
        });
        setDataFilters(filters);
      }
    };
    fetchUsers();
  }, [pageIndex]);

  const { error, loading, loadingComp } = state;

  if (loading) {
    return <Loader center />;
  }

  if (error) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <DataContext.Provider
      value={{
        data: dataFilters.find((el) => el.selected === true).data,
        dataFilters,
        emailCard,
        emails,
        error,
        filter,
        filters,
        loading,
        loadingComp,
        pageIndex,
        setDataFilters,
        setEmailCard,
        setEmails,
        setFilter,
        setPageIndex,
        setState,
        totalCount: dataFilters.find((el) => el.selected === true).totalCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
