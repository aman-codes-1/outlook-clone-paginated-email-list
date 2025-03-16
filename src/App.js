import { DataProvider } from "./contexts";
import { Dashboard } from "./pages";
import "./App.css";

const App = () => {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
};

export default App;
