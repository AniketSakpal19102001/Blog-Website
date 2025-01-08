import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { Pencil } from "lucide-react";
import { useGetBlogsByOwnerQuery } from "../redux/api/blogSlice";
import {
  useEditAboutMutation,
  useGetUserDataByIdQuery,
} from "../redux/api/userSlice";
import { toast } from "react-toastify";
// Example components for Home, About, and Saved
const Home = ({ id }) => {
  const {
    data: myBlog,
    isLoading,
    isError,
    refetch,
  } = useGetBlogsByOwnerQuery(id, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  if (myBlog && myBlog.data.length === 0)
    return <div className="p-4">No published blog yet.</div>;
  if (myBlog && myBlog.data.length > 0)
    return myBlog.data.map((i, index) => (
      <div key={index} className="">
        <BlogCard blogData={i} />
      </div>
    ));
};

const About = ({ data }) => {
  const currentUser = JSON.parse(localStorage.getItem("userInfo")).user.id;
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(data.about || "");
  const [editAbout] = useEditAboutMutation();

  const handleUpdateAbout = async () => {
    try {
      const response = await editAbout(aboutText).unwrap();
      console.log(response);
      toast.success(response.message, { autoClose: 500 });
      setIsEditing(false);
      navigate("/home");
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      setIsEditing(false);
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="p-4 text-gray-800 flex items-start">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="border border-gray-300 p-1 rounded-md"
          />
          <button
            onClick={handleUpdateAbout}
            className=" bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <span>{aboutText || "Write something about yourself..."}</span>
      )}
      {data._id === currentUser && !isEditing && (
        <button onClick={() => setIsEditing(true)}>
          <Pencil
            strokeWidth={0.9}
            className="w-12 md:w-22 mx-2 text-gray-600 hover:text-black transition-transform transform hover:translate-y-[-5px]"
          />
        </button>
      )}
    </div>
  );
};

const Saved = ({ data }) => {
  console.log(data);
  // if (!data) return <div>Error Fetching Data</div>;
  if (data && data.savedBlogs && data.savedBlogs.length === 0)
    return <div className="p-4">No Saved Blogs</div>;
  if (data && data.savedBlogs && data.savedBlogs.length > 0)
    return data.savedBlogs.map((i, index) => (
      <div key={index} className="p-4">
        <BlogCard blogData={i} />
      </div>
    ));
};

function TabView({ data }) {
  const [selectedTab, setSelectedTab] = useState("home");
  const currentUser = JSON.parse(localStorage.getItem("userInfo")).user.id;
  const { refetch } = useGetUserDataByIdQuery(data._id, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    refetch();
  };
  return (
    <div className="py-6 md:py-10">
      {/* Tab buttons */}
      <div className="flex border-b border-gray-300">
        <button
          className={`py-2 px-4 ${
            selectedTab === "home" ? "border-b-2 border-gray-800" : ""
          }`}
          onClick={() => handleTabSelect("home")}
        >
          Home
        </button>
        <button
          className={`py-2 px-4 ${
            selectedTab === "about" ? "border-b-2 border-gray-800" : ""
          }`}
          onClick={() => handleTabSelect("about")}
        >
          About
        </button>
        {data._id == currentUser && (
          <button
            className={`py-2 px-4 ${
              selectedTab === "saved" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => {
              handleTabSelect("saved");
            }}
          >
            Saved
          </button>
        )}
      </div>

      {/* Content based on selected tab */}
      <div className="mt-4">
        {selectedTab === "home" && <Home id={data._id} />}
        {selectedTab === "about" && <About data={data} />}
        {selectedTab === "saved" && <Saved data={data} />}
      </div>
    </div>
  );
}

export default TabView;
