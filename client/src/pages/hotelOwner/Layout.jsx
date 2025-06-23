import Sidebar from "../../components/hotelOwner/Sidebar";
import Navbar from "../../components/hotelOwner/Navbar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const Layout = () => {
  // const { isOwner, navigate } = useAppContext();
  // // we have protected that if user is not owner then directled to homepage
  // // Like for example someone directly accessing /owner url by writing on website then he/she should be directed back to home ap[ge if not hoteOwner]
  // useEffect(() => {
  //   if (!isOwner) {
  //     navigate("/");
  //   }
  // }, [isOwner]);
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
