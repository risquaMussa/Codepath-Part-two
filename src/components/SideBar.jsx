import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            {sidebarOpen && <span className="text-2g font-bold">Crewmate</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-xl"
          >
            ☰
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-2 px-2">
          <Link to="/" className="hover:bg-gray-700 px-4 py-2 rounded text-sm">
            Home
          </Link>
          <Link
            to="/create-crewmate"
            className="hover:bg-gray-700 px-4 py-2 rounded text-sm"
          >
            Create a Crewmate
          </Link>
          <Link
            to="/gallery"
            className="hover:bg-gray-700 px-4 py-2 rounded text-sm"
          >
            Crewmate Gallery
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
