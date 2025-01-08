import { CircleUserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

function Comments({ name, date, comment, id }) {
  return (
    <>
      <div className="flex flex-col gap-3 py-6 border-b">
        <div>
          <div className="flex justify-start items-center gap-4">
            <div className="w-8 h-8 rounded-full ">
              <CircleUserRound
                strokeWidth={0.9}
                className="w-8 h-8 rounded-full   text-gray-400"
              />
            </div>
            <div className="flex flex-col justify-center">
              <NavLink to={`/user/${id}`}>
                <div className="">
                  <span className="cursor-pointer">{name}</span>
                </div>
              </NavLink>
              <div className="text-gray-700 text-sm">{date}</div>
            </div>
          </div>
        </div>
        <div>{comment}</div>
      </div>
    </>
  );
}

export default Comments;
