import {
  ThumbsUp,
  MessageCircle,
  BookmarkPlus,
  BookmarkCheck,
  CircleUserRound,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import formatDate from "../utils/formatDate.js";
import {
  useGetProfileQuery,
  useSaveMutation,
  useUnSaveMutation,
} from "../redux/api/userSlice.js";
import { useEffect, useState } from "react";
function BlogCard({ blogData }) {
  const { data, refetch, isLoading, isError } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  const [profile, setProfile] = useState();
  const [addToSave] = useSaveMutation();
  const [removeFromSave] = useUnSaveMutation();
  useEffect(() => {
    if (data) {
      if (data.data) setProfile(data);
    }
  }, [data]);

  async function handleAddSave(id) {
    try {
      const response = await addToSave(id);
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveSave(id) {
    try {
      console.log("clicked", id);
      const response = await removeFromSave(id).unwrap();
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <div className="border-b flex">
        <div className="w-4/6 my-4 ">
          <NavLink to={`/blog/${blogData._id}`}>
            <div className="flex items-center gap-2 ">
              <div className="rounded-full w-5 h-5">
                <CircleUserRound
                  strokeWidth={0.9}
                  className="w-5 h-5 rounded-full text-gray-400"
                />
              </div>
              <p className="text-sm">
                {blogData.owner.fName + " " + blogData.owner.lName}
              </p>
            </div>
          </NavLink>
          <div className="text-lg md:text-2xl pt-2 md:py-2 font-bold">
            <NavLink to={`/blog/${blogData._id}`}>{blogData.title}</NavLink>
          </div>
          {/* <div className="hidden md:block text-gray-700">
            {stripHtmlTags(blogData.content).slice(0, 120) + "..."}
          </div>
          <div className="block md:hidden text-gray-700">
            {stripHtmlTags(blogData.content).slice(0, 45) + "..."}
          </div> */}
          <div className="flex justify-between items-center">
            <div className="text-gray-600 flex gap-5 py-4">
              <p>{formatDate(blogData.createdAt)}</p>
              <NavLink to={`/blog/${blogData._id}`}>
                <p className="flex items-center gap-1 hover:text-black text-gray-700 ">
                  <ThumbsUp
                    strokeWidth={0.8}
                    className={`h-4 w-4  ${
                      blogData.likes.includes(
                        JSON.parse(localStorage.getItem("userInfo")).user.id
                      )
                        ? "fill-current"
                        : ""
                    }`}
                  />
                  {blogData.likes.length}
                </p>
              </NavLink>
              <NavLink to={`/blog/${blogData._id}`}>
                <p className="flex items-center gap-1 hover:text-black text-gray-700">
                  <MessageCircle strokeWidth={0.8} className="h-4 w-4" />
                  {blogData.comments.length}
                </p>
              </NavLink>
            </div>
            <div className="md: mr-2 hover:text-black text-gray-700 cursor-pointer">
              {profile &&
              profile.data &&
              profile.data.savedBlogs
                .map((i) => i._id)
                .includes(blogData._id) ? (
                <BookmarkCheck
                  onClick={() => handleRemoveSave(blogData._id)}
                  strokeWidth={0.8}
                />
              ) : (
                <BookmarkPlus
                  onClick={() => handleAddSave(blogData._id)}
                  strokeWidth={0.8}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-2/6 p-6">
          <NavLink to={`/blog/${blogData._id}`}>
            <img
              src={blogData.imgSrc}
              alt="description"
              className="w-full h-full object-contain"
            />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
