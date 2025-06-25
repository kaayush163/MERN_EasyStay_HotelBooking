import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "Rs.";
  const navigate = useNavigate(); //instead of use everywhere we will use from context to show low redundancy and memory usage less
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]); //initialize with empty erro from backend data comes then fill
  const [rooms, setRooms] = useState([]); //for whatever room added on owner page need to display at home npage instead of dispalying from assets when doing on testing phase ats tarting with frontend only now from backend we have to do

  const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        //comes from backed if true or not
        setIsOwner(data.role === "hotelOwner"); //if hotelOwner is the role then setIsOwner set to true

        setSearchedCities(data.recentSearchedCities);
      } else {
        //Retry fetching user deatils after 5 seconds

        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // to show on home screen whatever owner has added rooms
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);
  // whenever use rget changed this is executed
  // it is called depencdency array in useEffect

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios, //acces this axios from context file
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
    facilityIcons,
  };
  // what ever object key value add invalue can be used oin any component that isuse of context API
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

//Now we can use thsi custom useAPpContext in any file whatever AppProvider provided
