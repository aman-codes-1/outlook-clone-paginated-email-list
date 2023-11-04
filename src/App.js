import { useEffect, useState } from "react";
import { Card, Header, Loader } from "./components";
import { callApi } from "./helpers";
import "./App.css";

const App = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: [],
    pageSize: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setState({
        loading: true,
        error: "",
        data: [],
        pageSize: 0,
      });
      try {
        const data = await callApi({
          method: "GET",
          url: `https://flipkart-email-mock.now.sh/?page=${pageIndex}`,
        });
        setState({
          loading: false,
          error: "",
          data: data?.data?.list || [],
          pageSize: data?.data?.total,
        });
      } catch (err) {
        setState({
          loading: false,
          error: JSON.stringify(err),
          data: [],
          pageSize: 0,
        });
      }
    };
    fetchUsers();
  }, [pageIndex]);

  if (state.loading) {
    return <Loader center />;
  }

  return (
    <div className="container">
      <Header />
      <Card data={state.data} />
    </div>
  );
};

export default App;
