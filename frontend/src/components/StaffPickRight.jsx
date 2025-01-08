function StaffPickRight() {
  return (
    <>
      <div className="py-10">
        <div className=" flex flex-col gap-3">
          <div>
            <img
              src="link.png"
              className="rounded-full aspect-square w-24 border-black border-2"
              alt=""
            />
          </div>
          <div className="font-bold">Blog Vibe Staff</div>
          <div className="text-gray-700">10k Followers</div>
          <div className="text-gray-700">
            Official account for news and updates from Blog Vibe.
          </div>
          <div className="py-1">
            {true ? (
              <button className="px-4 py-2 rounded-full border-2 border-green-800 text-green-800 hover:bg-green-700 hover:text-white">
                Following
              </button>
            ) : (
              <button className="px-4 py-2 rounded-full bg-green-800 text-white hover:bg-green-700">
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffPickRight;
