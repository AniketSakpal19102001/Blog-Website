import { NavLink } from "react-router-dom";
function Landing() {
  return (
    <>
      <div className="bg-orange-50">
        <div className="flex justify-between items-center border-b border-gray-600 py-2 ">
          <div className="text-xl py-2 font-bold  sm:ml-20 ml-6 ">
            <div className="whitespace-nowrap text-gray-900 dm-serif-display-regular text-3xl">
              BlogVibe
            </div>
          </div>
          <nav className="flex justify-between items-center  sm:mr-20 mr-6 gap-4">
            <NavLink to={"/about"} className="hidden sm:block list-none">
              About us
            </NavLink>
            <NavLink to={"/contact"} className="hidden sm:block list-none">
              Contact
            </NavLink>
            <NavLink to={"/login"} className="list-none">
              <button>Sign in</button>
            </NavLink>
            <li className="list-none">
              <NavLink
                to={"/register"}
                className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 rounded-full"
              >
                Get Started
              </NavLink>
            </li>
          </nav>
        </div>
        <div className="w-full min-h-screen">
          <div className="lg:grid xl:grid-cols-3 py-32  mx-6 md:mx-20 ">
            <div className="flex flex-col  col-span-2">
              <p id="hero" className="text-6xl md:text-8xl">
                Human
                <br /> stories & ideas
              </p>
              <p className="mt-7  text-xl self-start">
                A place to read, write, and deepen your understanding
              </p>
              <NavLink
                to={"/register"}
                className="mt-7 text-xl px-4 py-2 self-start bg-gray-900 text-white hover:bg-gray-700 rounded-full"
              >
                Start reading
              </NavLink>
            </div>
            <div className="hidden xl:flex justify-center items-center ">
              <img
                className="rotate-12 w-4/5 h-4/5"
                src="hero_book.png"
                alt="book image"
              />
            </div>
          </div>
          <div className="w-full bg-orange-50 border-t border-gray-600 py-4">
            <div className="flex justify-center items-center gap-4 py-5">
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">Help</p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">
                Status
              </p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">
                About
              </p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">
                Career
              </p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">
                Press
              </p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">Blog</p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">
                Privacy
              </p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">Term</p>
              <p className="text-gray-500 text-[0.8rem] cursor-pointer">
                Teams
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
