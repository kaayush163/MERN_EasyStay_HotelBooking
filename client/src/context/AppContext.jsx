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
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);
  // whenever use rget changed this is executed
  // it is called depencdency array in useEffect
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
  };
  // what ever object key value add invalue can be used oin any component that isuse of context API
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

//Now we can use thsi custom useAPpContext in any file whatever AppProvider provided
