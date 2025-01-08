import { NavLink } from "react-router-dom";
import { useGetAllBlogsQuery } from "../redux/api/blogSlice";
import formatDate from "../utils/formatDate";
import { CircleUserRound } from "lucide-react";
function StaffPick() {
  const { data, isError, isLoading, refetch } = useGetAllBlogsQuery();
  // console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Blogs</div>;
  return (
    <>
      <p className="py-7 font-semibold ">Popular Blogs</p>
      {data &&
        data.data.slice(0, 1).map((i, index) => (
          <div key={index}>
            <div className="py-4">
              <div className="flex items-center gap-2 ">
                <div className="rounded-full w-5 h-5">
                  <CircleUserRound
                    strokeWidth={0.9}
                    className="w-5 h-5 rounded-full text-gray-500"
                  />
                </div>
                <NavLink to={`/blog/${i._id}`}>
                  <p className="text-sm">
                    {i.owner.fName + " " + i.owner.lName}
                  </p>
                </NavLink>
              </div>
              <NavLink to={`/blog/${i._id}`}>
                <p className="font-bold py-1">{i.title}</p>
                <p className="text-gray-700">{formatDate(i.createdAt)}</p>{" "}
              </NavLink>
            </div>
          </div>
        ))}
    </>
  );
}

export default StaffPick;
