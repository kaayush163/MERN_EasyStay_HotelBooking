import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";

// slice(0,4) four data
const FeatureDestination = () => {
  return (
    <div>
      <div>
        {roomsDummyData.slice(0, 4).map((room, index) => {
          <HotelCard key={room._id} room={room} index={index} />;
        })}
      </div>
    </div>
  );
};

export default FeatureDestination;
