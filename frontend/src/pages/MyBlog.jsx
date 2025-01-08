import { useNavigate } from "react-router-dom";
function MyBlog() {
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <>
      <div className="text-xl pt-4 ml-4 md:ml-20">
        <h1>My Posts</h1>
      </div>
      <div className="mx-4 md:mx-20 pt-2">
        <div className="py-4">
          <div className="border-2 mt-5">
            <div className="md:flex gap-4">
              <div className="md:w-1/2 lg:w-2/6 overflow-y-hidden flex justify-center items-center  shadow-lg">
                <img
                  src="https://img.freepik.com/free-vector/blue-sports-car-isolated-white-vector_53876-67354.jpg"
                  alt=""
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
              <div className="md:w-1/2 lg:w-4/6 py-4  px-4">
                <p className="pt-2 text-3xl">Title</p>
                <p className=" text-[0.75rem] text-gray-400">27-09-2024</p>
                <p className=" text-[0.75rem] text-gray-400">
                  Created by Editor
                </p>
                <p className="py-2 text-gray-700">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem nesciunt eum magni sapiente commodi iste reprehenderit
                  eius unde eos mollitia atque delectus quisquam quo temporibus,
                  voluptatibus ipsum aperiam illum! Pariatur iure, natus beatae
                  sint quis voluptatum ullam sapiente blanditiis dolorem harum
                  assumenda eos ipsa enim vitae. Quaerat esse quo labore.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="border-2 mt-5">
            <div className="md:flex gap-4">
              <div className="md:w-1/2 lg:w-2/6 overflow-y-hidden flex justify-center items-center  shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXCpiYKfm11YUjU715AE4xto0XO6fzBiL8Q&s"
                  alt=""
                  className="h-full w-full object-fill rounded-md "
                />
              </div>
              <div className="md:w-1/2 lg:w-4/6 py-4  px-4">
                <p className="pt-2 text-3xl">Title</p>
                <p className=" text-[0.75rem] text-gray-400">27-09-2024</p>
                <p className=" text-[0.75rem] text-gray-400">
                  Created by Editor
                </p>
                <p className="py-2 text-gray-700">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem nesciunt eum magni sapiente commodi iste reprehenderit
                  eius unde eos mollitia atque delectus quisquam quo temporibus,
                  voluptatibus ipsum aperiam illum! Pariatur iure, natus beatae
                  sint quis voluptatum ullam sapiente blanditiis dolorem harum
                  assumenda eos ipsa enim vitae. Quaerat esse quo labore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBlog;
