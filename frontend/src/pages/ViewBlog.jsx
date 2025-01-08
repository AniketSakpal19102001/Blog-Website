import { useState, useEffect, useRef } from "react";
import {
  ThumbsUp,
  MessageCircle,
  BookmarkPlus,
  BookmarkCheck,
  CircleUserRound,
  Pencil,
} from "lucide-react";
import Comments from "../components/Comments";
import {
  useAddCommentMutation,
  useGetBlogByIdQuery,
  useToggleLikeMutation,
} from "../redux/api/blogSlice";
import formatDate from "../utils/formatDate";
import {
  useFollowMutation,
  useGetProfileQuery,
  useSaveMutation,
  useUnfollowMutation,
  useUnSaveMutation,
} from "../redux/api/userSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ViewBlog() {
  const navigate = useNavigate();
  const param = useParams();
  const {
    data: blogData,
    error,
    isFetching,
    refetch,
  } = useGetBlogByIdQuery(param.id, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  const {
    data: profileData,
    refetch: refetchProfile,
    isLoading,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [addToSave] = useSaveMutation();
  const [removeFromSave] = useUnSaveMutation();
  const [profile, setProfile] = useState({});
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const handleUnfollow = async (id) => {
    try {
      const response = await unfollow(id).unwrap();
      toast.success(response.message, { autoClose: 500 });
      console.log(response);
      refetch();
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
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      console.error("Error creating blog:", error);
    }
  };
  const commentInputRef = useRef(null); // Reference for the comment input field

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

  async function handleAddSave(id) {
    try {
      const response = await addToSave(id);
      console.log(response);
      refetchProfile();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveSave(id) {
    try {
      console.log("clicked", id);
      const response = await removeFromSave(id).unwrap();
      console.log(response);
      refetchProfile();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(blogData && blogData.data && blogData.data.owner.followed);
  console.log(JSON.parse(localStorage.getItem("userInfo")).user.id);

  async function handleAddComment(e) {
    try {
      const response = await addComment({
        blogId: blogData.data._id,
        comment: comment,
      });
      console.log(response.data.message);
      refetch();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleLike(e) {
    try {
      const response = await toggleLike(blogData.data._id);
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleScrollToCommentInput() {
    // Scroll to the comment input field when the message icon is clicked
    if (commentInputRef.current) {
      commentInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      commentInputRef.current.focus();
    }
  }

  if (isLoading || !profile)
    return <div className="min-h-screen text-center py-5">Loading...</div>;
  if (!blogData) return null;
  if (!profileData) return null;

  return (
    <>
      <div className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] min-h-screen">
        <div className="text-3xl md:text-[2.55rem] font-bold text-neutral-900 md:leading-[3.2rem] py-8 flex justify-between gap-4">
          {blogData.data.title}
          {blogData &&
            blogData.data &&
            profile &&
            profile.data &&
            blogData.data.owner._id == profile.data._id && (
              <NavLink to={`/edit/${blogData.data._id}`}>
                <Pencil
                  title="Edit Blog"
                  strokeWidth={1.9}
                  className="mt-2 md:mt-4 mr-4 text-gray-600 hover:text-black hover:cursor-pointer transition-transform transform hover:translate-y-[-4px]"
                />
              </NavLink>
            )}
        </div>

        <div className="flex justify-start items-center gap-4">
          <div className="w-12 h-12 rounded-full cursor-pointer">
            <CircleUserRound
              strokeWidth={0.9}
              className="w-12 h-12 rounded-full  text-gray-400"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <NavLink to={`/user/${blogData.data.owner._id}`}>
                <span className="hover:underline hover:text-black cursor-pointer">
                  {blogData.data.owner.fName + " " + blogData.data.owner.lName}
                </span>
              </NavLink>
              <span>·</span>
              {blogData &&
                blogData.data &&
                blogData.data.owner._id !=
                  JSON.parse(localStorage.getItem("userInfo")).user.id && (
                  <div>
                    {blogData &&
                    blogData.data &&
                    blogData.data.owner.followed.includes(
                      JSON.parse(localStorage.getItem("userInfo")).user.id
                    ) ? (
                      <button
                        onClick={() => handleUnfollow(blogData.data.owner._id)}
                        className="px-2 rounded-full border-2 border-green-800 text-green-800 hover:bg-green-700 hover:text-white"
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(blogData.data.owner._id)}
                        className="px-2 rounded-full border-2 border-green-700 bg-green-800 text-white hover:bg-green-700"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
            </div>
            <div className="text-gray-700">
              Published at {formatDate(blogData.data.createdAt)}
            </div>
          </div>
        </div>
        <div className="my-8 py-2 border-b border-t">
          <div className="mx-auto w-[95%] flex justify-between ">
            <div className="flex gap-6">
              <span
                title="Like"
                className="flex gap-2 hover:text-black text-gray-700 cursor-pointer"
              >
                <button onClick={handleToggleLike}>
                  <ThumbsUp
                    strokeWidth={0.8}
                    className={` ${
                      blogData.data.likes.includes(
                        JSON.parse(localStorage.getItem("userInfo")).user.id
                      )
                        ? "fill-current"
                        : ""
                    }`}
                  />
                </button>{" "}
                {blogData.data.likes.length}
              </span>{" "}
              <span
                title="Comment"
                className="flex gap-2 hover:text-black text-gray-700 cursor-pointer"
                onClick={handleScrollToCommentInput} // Trigger scroll on click
              >
                <MessageCircle strokeWidth={0.8} />{" "}
                {blogData.data.comments.length}
              </span>
            </div>
            <div
              title="Save"
              className=" hover:text-black text-gray-700 cursor-pointer"
            >
              {profile &&
              profile.data &&
              profile.data.savedBlogs
                .map((i) => i._id)
                .includes(blogData.data._id) ? (
                <BookmarkCheck
                  onClick={() => handleRemoveSave(blogData.data._id)}
                  strokeWidth={0.8}
                />
              ) : (
                <BookmarkPlus
                  onClick={() => handleAddSave(blogData.data._id)}
                  strokeWidth={0.8}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <img
            src={blogData.data.imgSrc}
            alt=""
            className="aspect-[7/4] object-cover"
          />
        </div>
        <div className="py-6 text-xl leading-8 roboto-serif border-b">
          <div dangerouslySetInnerHTML={{ __html: blogData.data.content }} />
        </div>
        <div className="py-12">
          <div className="border-b">
            <p className="text-3xl text-gray-900 font-semibold py-2">
              {blogData.data.comments.length > 0
                ? `Comments (${blogData.data.comments.length})`
                : "No Comments yet"}
            </p>
            <div className="bg-slate-300 relative my-10 ">
              <input
                type="text"
                name=""
                id=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="shadow-all p-3 rounded-sm w-full"
                placeholder="What are your thoughts ?"
                ref={commentInputRef} // Assign ref to the input field
              />
              <button
                onClick={handleAddComment}
                className="absolute bg-green-600 px-4 py-1 rounded-full text-slate-100 right-5 top-[18%]"
              >
                Respond
              </button>
            </div>
          </div>
          {blogData.data.comments.map((i, index) => (
            <Comments
              key={index}
              id={i.user._id}
              name={`${i.user.fName} ${i.user.lName}`}
              date={formatDate(i.datePosted)}
              comment={i.comment}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewBlog;
