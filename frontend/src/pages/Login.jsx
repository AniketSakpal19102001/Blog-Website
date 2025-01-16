import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { toast } from "react-toastify";
function Login() {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(login({ ...response }));
      toast.success("Logged in successfully!", { autoClose: 500 });
      navigate("/home");
    } catch (err) {
      toast.error(err.data.message, { autoClose: 500 });
      console.log(err);
    }
  };
  if (true)
    return (
      <div className="py-6 text-center min-h-screen">
        <img
          src="https://res.cloudinary.com/dobhpecq1/image/upload/v1737049316/v1qwgq89jldh2011ipdv.gif"
          className="mx-auto aspect-square w-14"
          alt=""
        />
        <div className="py-8">
          Please wait, we're processing your request...
        </div>
      </div>
    );

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow-xl border border-gray-200 rounded-lg w-[28rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex justify-center py-6">
            <h1 className="text-4xl font-semibold">Login</h1>
          </div>
          <div className="flex flex-col mx-5 mb-5 gap-4">
            <div className="w-full text-lg text-gray-700 grid gap-2">
              <label htmlFor="email">Email address</label>
              <input
                autoComplete="username"
                id="email"
                placeholder="Enter email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full text-lg text-gray-700 grid gap-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="w-full text-lg text-gray-700">
              <button
                type="submit"
                className="w-full h-full bg-blue-500 text-white rounded-md py-2"
              >
                Login
              </button>
            </div>
            <div className="w-full flex justify-center">
              <p>
                Not a user?{" "}
                <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <NavLink to={"/register"}>Register</NavLink>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
