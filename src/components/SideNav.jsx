import React, { useState } from "react";
import "./SideNav.css";
//import SearchBar from "./SearchBar";
//import Dashboard from "./Dashboard";
import { Link, Outlet } from "react-router-dom";

const SideNav = () => {
  //const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="side-nav">
      <h1 className="text-3xl font-bold text-center mb-6">
        Astro
        <br />
        DASH
      </h1>

      <nav className="space-y-4">
        <Link
          to="/"
          className="cursor-pointer text-white hover:text-purple-200"
        >
          🏠 Dashboard
        </Link>
        <div className="-pointer text-white hover:text-purple-200">
          🔍 Search
        </div>

        <div className="cursor-pointer text-white hover:text-purple-200">
          ℹ️ About
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default SideNav;
