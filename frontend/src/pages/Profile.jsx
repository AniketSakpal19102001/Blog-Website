import { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import TabView from "../components/Tabview";
import { useGetProfileQuery } from "../redux/api/userSlice";
import { CircleUserRound } from "lucide-react";

function Profile() {
  return <>{<BaseLayout componentLeft={Left} componentRight={Right} />}</>;
}

export default Profile;

function Left() {
  const { data, isError, isLoading, refetch } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  const [profileData, setProfileData] = useState([]);
  // console.log(profileData);
  useEffect(() => {
    if (data) {
      // console.log(data);
      setProfileData(data.data);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="py-6 md:py-10 ">
        <div className="md:block hidden font-bold text-4xl">
          {profileData.fName + " " + profileData.lName}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <div className="w-12 h-12 rounded-full text-gray-600">
            <CircleUserRound
              strokeWidth={0.9}
              className="rounded-full w-12 h-12 aspect-square"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className=" hover:text-black text-2xl font-bold">
              {profileData.fName + " " + profileData.lName}
            </span>
            <div className="text-gray-700">
              {profileData &&
                profileData.followed &&
                profileData.followed.length + " Followers"}
            </div>
          </div>
        </div>
        {/* <div className="block md:hidden w-full my-2">
          {true ? (
            <button className="w-full font-semibold text-white text-xs py-3 bg-green-700  rounded-full cursor-pointer hover:bg-green-900">
              Follow
            </button>
          ) : (
            <button className="w-full font-semibold  py-3 text-xs text-green-700 border border-green-700 cursor-pointer rounded-full hover:text-green-900 hover:border-green-900">
              Following
            </button>
          )}
        </div> */}
        <TabView data={profileData} />
      </div>
    </>
  );
}
function Right() {
  const { data, isError, isLoading, refetch } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  const [profileData, setProfileData] = useState([]);
  // console.log(profileData);
  useEffect(() => {
    if (data) {
      // console.log(data);
      setProfileData(data.data);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="py-10">
        <div className=" flex flex-col gap-3">
          <div className="w-24 h-24 rounded-full text-gray-700">
            <CircleUserRound
              strokeWidth={0.7}
              className="rounded-full w-24 h-24 aspect-square"
            />
          </div>
          <div className="font-bold">
            {profileData.fName + " " + profileData.lName}
          </div>
          <div className="text-gray-700">
            {profileData &&
              profileData.followed &&
              profileData.followed.length + " Followers"}
          </div>
          <div className="text-gray-700 ">
            {profileData && profileData.about}
          </div>
          {/* <div className="py-1">
            {profileData &&
            profileData.followed &&
            profileData.followed.includes(
              JSON.parse(localStorage.getItem("userInfo")).user.id
            ) ? (
              <button
                onClick={handleUnfollow}
                className="px-4 py-2 rounded-full border-2 border-green-800 text-green-800 hover:bg-green-700 hover:text-white"
              >
                Following
              </button>
            ) : (
              <button className="px-4 py-2 rounded-full bg-green-800 text-white hover:bg-green-700">
                Follow
              </button>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
