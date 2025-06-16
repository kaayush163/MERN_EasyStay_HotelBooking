import React from "react";

const HotelCard = ({ room, index }) => {
  //   we taken destructured manner only tewo parameters room  andindex and onclick will scroll to top 0,0
  return (
    <Link
      to={"/rooms/" + room._id}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
    >
      <img
        src={room.images[0]}
        alt=""
        className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] "
      />
      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 text-xs bg-white text-gray-800 font-medium rounded-full">
          Best Seller
        </p>
      )}
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" /> 4.5
          </div>
        </div>
        <div>
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
        <div>
          <p>
            <span className="text-xl text-gray-800">${room.pricePerNight}</span>
            /night
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer ">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
