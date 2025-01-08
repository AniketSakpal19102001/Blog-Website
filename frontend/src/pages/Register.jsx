import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/userSlice";
import { toast } from "react-toastify";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const handleRegister = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      reset();
      toast.success(response.message);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.data.message);
    }
  };

  if (isLoading)
    return <div className="py-6 text-center min-h-screen">Redirecting...</div>;

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="shadow-xl border border-gray-200 rounded-lg w-[28rem]">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="w-full flex justify-center py-6 ">
              <h1 className="text-4xl font-semibold">Register</h1>
            </div>
            <div className="flex flex-col mx-5 mb-5 gap-4">
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="fName">First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  {...register("fName", { required: "First name is required" })}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
                {errors.fName && (
                  <span className="text-red-500 text-sm">
                    {errors.fName.message}
                  </span>
                )}
              </div>
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="lName">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  {...register("lName", { required: "Last name is required" })}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
                {errors.lName && (
                  <span className="text-red-500 text-sm">
                    {errors.lName.message}
                  </span>
                )}
              </div>
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="email">Email address</label>
                <input
                  placeholder="Enter email"
                  type="email"
                  autoComplete="username"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  autoComplete="current-password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="w-full text-lg text-gray-700">
                <button className="w-full h-full bg-blue-500 text-white rounded-md py-2">
                  Register
                </button>
              </div>

              <div className="w-full flex justify-center">
                <p>
                  Already a user?{" "}
                  <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <NavLink to="/login">Sign in</NavLink>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
