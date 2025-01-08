import { NavLink, useLocation } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import BlogCard from "./BlogCard";
import Navbar from "./NavbarCategory";
import StaffPick from "./StaffPick";
import {
  useGetAllBlogsQuery,
  useGetBlogsByTagQuery,
} from "../redux/api/blogSlice";
import { useEffect, useState } from "react";

function Home() {
  // Get the current location (URL)
  const location = useLocation();

  // Parse the search parameters from the URL
  const urlParams = new URLSearchParams(location.search);
  const categories = urlParams.get("categories");

  // Get all blogs or blogs filtered by category based on the "categories" parameter
  const {
    data: allBlogsData,
    error,
    isLoading,
    refetch,
  } = useGetAllBlogsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  const { data: filteredBlogsData, isLoading: catagoryLoading } =
    useGetBlogsByTagQuery(categories, {
      refetchOnMountOrArgChange: true,
      staleTime: 0,
    });

  const [allBlog, setAllBlog] = useState();

  useEffect(() => {
    if (categories && filteredBlogsData) {
      // If there is a "categories" parameter, use the filtered data
      setAllBlog(filteredBlogsData);
    } else if (allBlogsData) {
      // If no "categories" parameter, use the data from all blogs
      setAllBlog(allBlogsData);
    }
    refetch(); // You may want to refetch if necessary for fresh data
  }, [allBlogsData, filteredBlogsData, categories, refetch]);

  if (isLoading || catagoryLoading)
    return <div className="py-6 text-center min-h-screen">Loading...</div>;

  return (
    <>
      <BaseLayout
        componentLeft={() => (
          <>
            <div className="py-4">
              <Navbar />
            </div>
            <div className="flex-1 py-6">
              {allBlog &&
                allBlog.data.map((i, index) => (
                  <BlogCard key={index} blogData={i} />
                ))}
            </div>
          </>
        )}
        componentRight={() => (
          <>
            <StaffPick />
          </>
        )}
      />
    </>
  );
}

export default Home;
