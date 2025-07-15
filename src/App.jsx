import Dashboard from "./components/Dashboard";
import SideNav from "./Components/SideNav";

//const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  return (
    <div>
      <div className="flex-1 p-6">
        <SideNav />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
