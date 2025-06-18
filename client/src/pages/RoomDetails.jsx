import React from "react";
import { useParams } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  // for particular roomm multiple image of every room of that flat no

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, []);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div>
          <h1>
            {room.hotel.name}
            <span>({room.roomType})</span>
          </h1>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
