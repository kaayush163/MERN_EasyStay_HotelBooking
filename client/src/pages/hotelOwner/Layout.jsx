import React from "react";
import Sidebar from "../../components/hotelOwner/Sidebar";
import Navbar from "../../components/hotelOwner/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
          {/* children component woill be displayed in this outlet  */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
