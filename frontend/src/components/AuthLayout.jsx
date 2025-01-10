import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

function AuthLayout() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <div>{userInfo ? <Outlet /> : <Navigate to={"/"} />}</div>
      <div className="w-full border-t py-2 bg-slate-50">
        <div className="hidden md:flex justify-center items-center gap-4 py-5">
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Help</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Status</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">About</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Career</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Press</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Blog</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Privacy</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Term</p>
          <p className="text-gray-500 text-[0.8rem] cursor-pointer">Teams</p>
        </div>
        <div className="text-gray-500 py-3 text-[0.8rem] cursor-pointer w-full flex flex-col md:hidden items-center">
          <p>BlogVibe @ 2025</p>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
