import { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import TabView from "../components/Tabview";
import {
  useFollowMutation,
  useGetProfileQuery,
  useGetUserDataByIdQuery,
  useUnfollowMutation,
} from "../redux/api/userSlice";
import { CircleUserRound } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function User() {
  return <>{<BaseLayout componentLeft={Left} componentRight={Right} />}</>;
}

export default User;

function Left() {
  const params = useParams();
  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useGetUserDataByIdQuery(params.user, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const handleUnfollow = async (id) => {
    try {
      const response = await unfollow(id).unwrap();
      toast.success(response.message, { autoClose: 500 });
      console.log(response);
      refetch();
      navigate("/home");
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      console.error("Error creating blog:", error);
    }
  };
  const handleFollow = async (id) => {
    try {
      const response = await follow(id).unwrap();
      toast.success(response.message, { autoClose: 500 });
      console.log(response);
      refetch();
      navigate("/home");
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      console.error("Error creating blog:", error);
    }
  };

  // console.log(userData);

  const [profileData, setProfileData] = useState([]);
  //   useEffect(() => {
  //     if (data) {
  //       setProfileData(data.data);
  //     }
  //   }, [data]);
  useEffect(() => {
    if (userData) {
      setProfileData(userData.data);
    }
  }, [userData]);
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
        {profileData._id !=
          JSON.parse(localStorage.getItem("userInfo")).user.id && (
          <div className="block md:hidden w-full my-2">
            {profileData &&
            profileData.followed &&
            profileData.followed.includes(
              JSON.parse(localStorage.getItem("userInfo")).user.id
            ) ? (
              <button
                onClick={() => handleUnfollow(profileData._id)}
                className="w-full font-semibold  py-3 text-xs text-green-700 border border-green-700 cursor-pointer rounded-full hover:text-green-900 hover:border-green-900"
              >
                Following
              </button>
            ) : (
              <button
                onClick={() => handleFollow(profileData._id)}
                className="w-full font-semibold text-white text-xs py-3 border border-green-700 bg-green-700  rounded-full cursor-pointer hover:bg-green-900"
              >
                Follow
              </button>
            )}
          </div>
        )}
        <TabView data={profileData} />
      </div>
    </>
  );
}
function Right() {
  const params = useParams();
  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useGetUserDataByIdQuery(params.user, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const handleUnfollow = async (id) => {
    try {
      const response = await unfollow(id).unwrap();
      toast.success(response.message, { autoClose: 500 });
      console.log(response);
      refetch();
      navigate("/home");
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      console.error("Error creating blog:", error);
    }
  };
  const handleFollow = async (id) => {
    try {
      const response = await follow(id).unwrap();
      toast.success(response.message, { autoClose: 500 });
      console.log(response);
      refetch();
      navigate("/home");
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      console.error("Error creating blog:", error);
    }
  };

  const [profileData, setProfileData] = useState([]);
  // console.log(profileData);
  //   useEffect(() => {
  //     if (data) {
  //       // console.log(data);
  //       setProfileData(data.data);
  //     }
  //   }, [data]);
  useEffect(() => {
    if (userData) {
      setProfileData(userData.data);
    }
  }, [userData]);
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
          {profileData._id !=
            JSON.parse(localStorage.getItem("userInfo")).user.id && (
            <div className="py-1">
              {profileData &&
              profileData.followed &&
              profileData.followed.includes(
                JSON.parse(localStorage.getItem("userInfo")).user.id
              ) ? (
                <button
                  onClick={() => handleUnfollow(profileData._id)}
                  className="px-4 py-2 rounded-full border-2 border-green-800 text-green-800 hover:bg-green-700 hover:text-white"
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(profileData._id)}
                  className="px-4 py-2 rounded-full border-2 border-green-700 bg-green-800 text-white hover:bg-green-700"
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
