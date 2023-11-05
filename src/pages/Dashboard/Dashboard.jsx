import { useContext } from "react";
import { DataContext } from "../../contexts";
import { CardLayout, Header } from "../../components";
import "./Dashboard.css";

const Dashboard = () => {
  const { setEmailCard, setPageIndex } = useContext(DataContext);

  const handleChangePage = (_, newPage) => {
    setEmailCard(false);
    setPageIndex(newPage + 1);
  };

  return (
    <div className="container">
      <Header handleChangePage={handleChangePage} />
      <CardLayout />
    </div>
  );
};

export default Dashboard;
