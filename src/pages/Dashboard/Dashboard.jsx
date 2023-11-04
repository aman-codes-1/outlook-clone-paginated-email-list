import { useEffect, useState } from "react";
import { CardLayout, Header, Loader } from "../../components";
import { callApi } from "../../helpers";
import "./Dashboard.css";

const Dashboard = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [state, setState] = useState({
    loading: true,
    loadingComp: false,
    error: "",
    data: [],
    pageSize: 0,
    totalCount: 0,
  });
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
          data: data?.data?.list || [],
          pageSize: data?.data?.total,
          totalCount: data?.data?.total,
        });
      } catch (err) {
        setState({
          loading: false,
          loadingComp: false,
          error: JSON.stringify(err),
          data: [],
          pageSize: 0,
          totalCount: 0,
        });
      }
    };
    fetchUsers();
  }, [pageIndex]);

  if (state.loading) {
    return <Loader center />;
  }

  const handleChangePage = (_, newPage) => {
    setEmailCard(false);
    setPageIndex(newPage + 1);
  };

  return (
    <div className="container">
      <Header
        state={state}
        pageIndex={pageIndex}
        handleChangePage={handleChangePage}
      />
      <CardLayout
        data={state.data}
        loadingComp={state.loadingComp}
        emailCard={emailCard}
        setEmailCard={setEmailCard}
      />
    </div>
  );
};

export default Dashboard;
