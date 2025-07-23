import Dashboard from "./components/Dashboard";
import SideNav from "./components/SideNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Layout from "./routes/Layout";
import DetailView from "./routes/DetailView";
//const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  return (
    <BrowserRouter>
      <div className="flex-1 p-6">
        <SideNav />

        <Routes>
          <Route index={true} path="/" element={<Dashboard />} />
          <Route path="/Details/:postalCode/:date" element={<DetailView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
