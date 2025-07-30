import Sidebar from "./components/SideBar";
import Home from "./components/Home";
import CreateCrewmate from "./components/CreateCrewmate";
import CrewmateGallery from "./components/CrewmateGallery";
import EditCrewmate from "./components/EditCrewmate";
import CrewmateList from "./components/CrewmateList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-crewmate" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/edit/:id" element={<EditCrewmate />} />
            <Route path="/list" element={<CrewmateList />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
