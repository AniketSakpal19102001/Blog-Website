import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

import TagPageCard from "../components/TagPageCard";
function TagPage() {
  const params = useParams();
  const tag = params.tag;
  return (
    <>
      <div className="mx-auto w-[95%] md:w-[80%] py-4">
        <div className="font-semibold text-gray-900 text-center py-10 flex flex-col md:gap-5 gap-3 border-b">
          <p className="text-4xl md:text-5xl ">#{tag}</p>
          {/* <p className="text-gray-500">7.8M Followers</p> */}
          <div>
            {/* <button className="bg-gray-900 text-white px-4 py-2 rounded-full">
              Follow
            </button> */}
          </div>
        </div>
        <div className="hidden md:block py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TagPageCard />
            <TagPageCard />
            <TagPageCard />
            <TagPageCard />
            <TagPageCard />
          </div>
        </div>
        <div className="block md:hidden py-4">
          {/* <BlogCard />
          <BlogCard />
          <BlogCard /> */}
        </div>
      </div>
    </>
  );
}

export default TagPage;
