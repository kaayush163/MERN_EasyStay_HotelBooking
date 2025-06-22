import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";

import Footer from "./components/Footer";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import ListRoom from "./pages/hotelOwner/ListRoom";
import AddRoom from "./pages/hotelOwner/AddRoom";
import { Toaster } from "react-hot-toast"; //for notification
import { useAppContext } from "./context/AppContext";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner"); //this will hide the nav bar for owner path /owner
  const { showHotelReg } = useAppContext();
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      {/* If showHotelReg false then hide the HoteRegisteration otherwise true to shwo the hotel regsietration at home page */}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            {/* Below this the url would be like this /owner/add-room */}
            {/* my-bookings not taken from yourself it is api end point provided my clerk hook signin my-booking go there */}
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
      {/* on all pages it will be displayed */}
    </div>
  );
};

export default App;
