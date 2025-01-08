import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
function Blog() {
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <>
      <Home />
      {/* <div className="mx-4 md:mx-20 pt-5">
        <div className="py-4">
          <div className="border-2 mt-5">
            <div className="md:flex gap-4">
              <div className="md:w-1/2 lg:w-2/6 overflow-y-hidden flex justify-center items-center  shadow-lg">
                <img
                  src="https://tradebrains.in/features/wp-content/uploads/2023/04/Cryptocurrency-chart.png"
                  alt=""
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
              <div className="md:w-1/2 lg:w-4/6 py-4  px-4">
                <p className="pt-2 text-3xl">
                  35 Candlestick Chart Patterns in the Stock Market Explained
                </p>
                <p className=" text-[0.75rem] text-gray-400">04-10-2024</p>
                <p className=" text-[0.75rem] text-gray-400">
                  Created by Vivek Bajaj
                </p>
                <p className="py-2 text-gray-700">
                  Did you know we can visually analyse whether the Bulls or the
                  Bears are winning? Candlestick patterns help us see the price
                  movements of any stock on the charts. Candlesticks tell a
                  comprehensive story, with the body and wicks of each
                  candlestick revealing whether the bulls or bears are in
                  control. <br /> Additionally, they provide key data such as
                  the opening and closing prices, as well as the highest and
                  lowest prices reached over a given period (day, week, or
                  month). It is important for any technical analyst in the stock
                  market to understand the interpretation of candlestick chart
                  patterns. By recognizing these patterns, they can make
                  informed decisions about future price movements....{" "}
                  <span className="cursor-pointer text-blue-700">
                    read more
                  </span>
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLD5nnwiIVghAnUvEfMyQegTTpjb9-QuHpMg&s"
                  alt=""
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
              <div className="md:w-1/2 lg:w-4/6 py-4  px-4">
                <p className="pt-2 text-3xl">
                  Integrating Psychology into Software Development
                </p>
                <p className=" text-[0.75rem] text-gray-400">10-09-2023</p>
                <p className=" text-[0.75rem] text-gray-400">
                  Created by Ulas Can Cengiz
                </p>
                <p className="py-2 text-gray-700">
                  Imagine sitting down at your desk to untangle a particularly
                  complex piece of software code. Your eyes scan lines packed
                  with logical operations and function calls. Somewhere in this
                  intricate weave, a bug lurks, derailing the application’s
                  performance. This scenario, familiar to many developers, isn’t
                  just a test of technical skill; it’s a psychological
                  challenge. The frustration and cognitive fatigue that often
                  accompany such tasks can cloud judgment and prolong
                  resolution. It’s in moments like these that the intersection
                  of psychology and software development comes into sharp focus.
                  <br />
                  Cognitive load theory, originally applied to educational
                  psychology, has profound implications for ...{" "}
                  <span className="cursor-pointer text-blue-700">
                    read more
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Blog;
