import BlogCard from "./BlogCard";

function StaffPickLeft() {
  return (
    <>
      <div className="py-6 md:py-10 ">
        <div className=" justify-start items-center gap-4 md:flex hidden ">
          <div className="w-12 h-12 rounded-full border  border-gray-800">
            <img
              src="link.png"
              alt=""
              className="rounded-full w-12 aspect-square"
            />
          </div>
          <div className="text-xl">Blog Vibe Staff</div>
        </div>
        <div className="flex md:hidden justify-start items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-gray-800">
            <img
              src="link.png"
              alt=""
              className="rounded-full w-12 aspect-square"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <span className=" hover:text-black">Blog Vibe Staff</span>
              {true ? (
                <button className="font-semibold text-white text-xs py-1 bg-green-700 px-3 rounded-full cursor-pointer hover:bg-green-900">
                  Follow
                </button>
              ) : (
                <button className="font-semibold px-3 py-1 text-xs text-green-700 border border-green-700 cursor-pointer rounded-full hover:text-green-900 hover:border-green-900">
                  Following
                </button>
              )}
            </div>
            <div className="text-gray-700">10k Followers</div>
          </div>
        </div>
      </div>
      {/* <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard /> */}
    </>
  );
}

export default StaffPickLeft;
