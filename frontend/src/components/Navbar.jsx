import { CircleUserRound, SquarePen, Bell, Search } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/userSlice";
import { logout } from "../redux/features/authSlice";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  async function handleLogout(e) {
    e.preventDefault();

    try {
      const response = await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!", { autoClose: 1000 });
      navigate("/");
    } catch (error) {
      toast.error("Logout failed! Please try again.");
      console.log("Logout failed", error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      setIsDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-between items-center border-b border-gray-600 border-opacity-40 py-1 md:py-2">
      <div className="text-xl py-2 font-bold ml-6">
        <NavLink
          to={"/home"}
          className="whitespace-nowrap text-gray-900 dm-serif-display-regular text-2xl md:text-3xl"
        >
          <img
            src="/logo.png"
            alt=""
            className="md:h-8 h-7 w-full rounded-md px-1"
          />
        </NavLink>
      </div>
      <div className="flex justify-between items-center mr-6 gap-4 md:gap-6 w-full">
        <div className="hidden md:flex items-center justify-center ml-6">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-0 focus:bg-gray-50"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
        <div className="flex justify-end w-full gap-3 md:gap-8 items-center">
          <NavLink to={"/create"}>
            <div
              className={`hidden md:flex gap-2 hover:text-black text-gray-700 ${
                location.pathname === "/create" ? "text-black" : ""
              }`}
            >
              <SquarePen
                strokeWidth={0.8}
                className="w-[1.4rem] h-[1.4rem] md:w-6 md:h-6"
              />{" "}
              <span>Write</span>
            </div>
          </NavLink>
          <button className=" p-2 rounded-full block md:hidden hover:text-black text-gray-700">
            <Search
              strokeWidth={0.8}
              className="w-[1.4rem] h-[1.4rem] md:w-6 md:h-6"
            />
          </button>
          <NavLink to={"/notification"}>
            <Bell
              strokeWidth={0.8}
              className={`w-[1.4rem] h-[1.4rem] md:w-6 md:h-6 hover:text-black text-gray-700 ${
                location.pathname === "/notification" ? "fill-current" : ""
              }`}
            />
          </NavLink>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling on dropdown toggle
                setIsDropdownOpen((prev) => !prev);
              }}
              className="p-2 rounded-full hover:text-black text-gray-700"
            >
              <CircleUserRound
                strokeWidth={0.8}
                className="w-[1.4rem] h-[1.4rem] md:w-6 md:h-6"
              />
            </button>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 z-40 bg-white rounded-lg shadow-lg py-2 text-gray-700"
              >
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown on selection
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/create"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown on selection
                >
                  Create Blog
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Signout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
