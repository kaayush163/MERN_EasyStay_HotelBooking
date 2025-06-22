import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

//new
const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  // const ref = React.useRef(null)

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { openSignIn } = useClerk(); //new login with google provided by clerk this hook
  // const { user } = useUser(); //provided by clerk after sign with google able to detect user or not
  // const navigate = useNavigate();

  const { user, navigate, isOwner, setShowHotelReg } = useAppContext(); // suing AppCOntext we can provide now like this7:5058

  useEffect(() => {
    // when location.pathname chnages it will call inside the fucntion of this useEffect

    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));
    const handleScroll = () => {
      // setIsScrolled(ref.current.scrollTop > 10);
      setIsScrolled(window.scrollY > 10);
    };
    // ref.current.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    // <div ref={ref} className="h-88 md:h-64 overflow-y-scroll">
    // <p className="w-10 h-[500px]"></p>
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      {/* <a href="/" className="flex items-center gap-2">
                    <img src={"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                </a> */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}
        {/* 7:52 when the user logged then only Dashboard button will shown up */}
        {user && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
            onClick={
              () => (isOwner ? navigate("/owner") : setShowHotelReg(true))
              // owner page is that where owner of hotel can only add rooms manage rthem see rveneue
            }
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}

            {/* Dashboard */}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        {/* <svg className={`h-6 w-6 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg> */}
        <img
          src={assets.searchIcon}
          alt="search"
          className={`${
            isScrolled && "invert"
          } h-7 transition-all duration-500`}
        />
        {/* for desktop screen and for showing Login button or user profile on right side*/}
        {/* when click on button will navigate to my-bookings page label icon added from BookIcon present at top */}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}

      <div className="flex items-center gap-3 md:hidden">
        {/* added this to show on user logged in */}
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        {/* <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg> */}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt=""
          className={`${isScrolled && "invert"} h-4`}
        />
        {/* isMenuOpen to open close for bar navoptions */}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg> */}
          <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {/* if user present then only will show dashboard when click on dashboard will navigate to hotel owner */}
        {user && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
            // onClick={() => navigate("/owner")
            onClick={
              () => (isOwner ? navigate("/owner") : setShowHotelReg(true))
              // owner page is that where owner of hotel can only add rooms manage rthem see rveneue
            }
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
            {/* Dashboard */}
          </button>
        )}
        {/* for mobile screen  */}
        {/* if userlogout then only login will show up */}
        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
    // </div>
  );
};

export default Navbar;
