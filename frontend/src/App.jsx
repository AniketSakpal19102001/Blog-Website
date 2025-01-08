import { Routes, Route, Outlet } from "react-router-dom";
import Blog from "./pages/Blog";
import Create from "./pages/Create";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
// import MyBlog from "./pages/MyBlog";
import Register from "./pages/Register";
import ViewBlog from "./pages/ViewBlog";
import AuthLayout from "./components/AuthLayout";
import Landing from "./pages/Landing";
import StaffPickPage from "./pages/StaffPickPage";
import TagPage from "./pages/TagPage";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./components/User";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated routes */}
        <Route element={<AuthLayout />}>
          <Route path="/home" element={<Blog />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/blog/:id" element={<ViewBlog />} />
          <Route path="/user/:user" element={<User />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          {/* <Route path="/staff" element={<StaffPickPage />} /> */}
        </Route>
        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </>
  );
}

export default App;
