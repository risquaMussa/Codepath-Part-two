import React, { useState } from "react";
import "./SideNav.css";
//import SearchBar from "./SearchBar";
//import Dashboard from "./Dashboard";

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
        <div className="hover:text-purple-200 cursor-pointer">🏠 Dashboard</div>
        <div className="hover:text-purple-200 cursor-pointer">🔍 Search</div>

        <div className="hover:text-purple-200 cursor-pointer">ℹ️ About</div>
      </nav>
    </div>
  );
};

export default SideNav;
