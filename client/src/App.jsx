import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";

import Footer from "./components/Footer";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner"); //this will hide the nav bar for owner path /owner

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          {/* my-bookings not taken from yourself it is api end point provided my clerk hook signin my-booking go there */}
        </Routes>
      </div>
      <Footer />
      {/* on all pages it will be displayed */}
    </div>
  );
};

export default App;
