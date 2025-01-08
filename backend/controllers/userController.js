import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import appError from "../utils/appError.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";

export const handleRegister = catchAsync(async (req, res, next) => {
  const { email, password, fName, lName } = req.body;
  console.log(req.body);

  if (!fName || !lName || !email || !password) {
    return next(new appError("All fields must be filled", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new appError("User already exists. Try logging in", 409));
  }

  let newUser = new User({
    email,
    password,
    fName,
    lName,
  });

  const result = await newUser.save();

  const welcomeMessage = `Welcome to Blog Vibe, ${fName}! We're thrilled to have you as part of our community. Start exploring blogs and sharing your thoughts!`;

  newUser.notifications.push({ message: welcomeMessage });

  await newUser.save();

  res.status(201).json({
    status: "success",
    message: "Registration successful.",
    user: {
      id: newUser._id,
      fName: newUser.fName,
      lName: newUser.lName,
      email: newUser.email,
      notifications: newUser.notifications,
    },
  });
});

export const handleLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) return next(new appError("Invalid username or password", 401));

  const matchPassword = await user.comparePassword(password);
  if (!matchPassword)
    return next(new appError("Invalid username or password", 401));

  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.JWT_SECRET
  );
  user.password = undefined;
  res.cookie("token", token, { httpOnly: true, secure: true });

  return res.status(200).json({
    user: {
      id: user._id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      // following: user.following,
      // follower: user.followed,
      // savedBlogs: user.savedBlogs,
      // notifications: user.notifications,
      // followedTags: user.followedTags,
    },
  });
});

export const handleLogout = (req, res, next) => {
  res.clearCookie("token", { httpOnly: true, secure: true });

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const addFollowing = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const selfId = req.user.id;

  const currentUser = await User.findById(selfId);

  if (currentUser._id.toString() === userId) {
    return next(new appError("You cannot follow yourself", 400));
  }

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return next(new appError("User not found", 404));
  }

  if (currentUser.following.includes(userId)) {
    return next(new appError("You are already following this user", 400));
  }

  currentUser.following.push(userId);
  targetUser.followed.push(currentUser._id);

  await currentUser.save();
  await targetUser.save();

  res.status(200).json({
    status: "success",
    message: "You are now following this user",
  });
});

export const removeFollowing = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const selfId = req.user.id;

  const currentUser = await User.findById(selfId);

  if (currentUser._id.toString() === userId) {
    return next(new appError("You cannot unfollow yourself", 400));
  }

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return next(new appError("User not found", 404));
  }

  if (!currentUser.following.includes(userId)) {
    return next(new appError("You are not following this user", 400));
  }

  currentUser.following = currentUser.following.filter(
    (followId) => followId.toString() !== userId
  );

  targetUser.followed = targetUser.followed.filter(
    (followerId) => followerId.toString() !== currentUser._id.toString()
  );

  await currentUser.save();
  await targetUser.save();

  res.status(200).json({
    status: "success",
    message: "You have unfollowed this user",
  });
});

export const getNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new appError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    notifications: user.notifications,
  });
});

export const removeNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { notification_id } = req.body;

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return next(new appError("User not found", 404));
  }

  console.log(req.body);

  if (
    !user.notifications.some(
      (notification) => notification._id.toString() === notification_id
    )
  ) {
    return next(new appError("Notification not found", 404));
  }

  user.notifications = user.notifications.filter(
    (notification) => notification._id.toString() !== notification_id
  );

  const result = await user.save();

  res.status(200).json({
    status: "success",
    notifications: user.notifications,
  });
});

export const addToSaved = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { blogId } = req.body;
  const user = await User.findById(userId);
  if (!user) return next(new appError("User not found", 404));
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return next(new appError("BlogId Invalid", 404));
  const blog = await Blog.findById(blogId.toString());
  // console.log(blog);
  if (!blog) return next(new appError("No blog found", 404));
  if (user.savedBlogs.includes(blogId))
    return next(new appError("blog already in saved blogs"));

  user.savedBlogs.unshift(blogId);
  const result = await user.save();
  console.log(result);

  res.status(200).json({
    status: "success",
    savedBlogs: user.savedBlogs,
  });
});

export const removeSaved = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { blogId } = req.body;
  const user = await User.findById(userId);
  if (!user) return next(new appError("User not found", 404));
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return next(new appError("BlogId Invalid", 404));
  const blog = await Blog.findById(blogId.toString());
  console.log(blog);
  if (!blog) return next(new appError("No blog found", 404));

  if (!user.savedBlogs.includes(blogId))
    return next(new appError("blog is not in your saved blogs"));

  user.savedBlogs = user.savedBlogs.filter((i) => i._id != blogId);
  const result = await user.save();
  console.log(result);

  res.status(200).json({
    status: "success",
    savedBlogs: user.savedBlogs,
  });
});

export const getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate({
    path: "savedBlogs",
    populate: {
      path: "owner", // This will populate the "owner" field in each blog
      model: "User", // Specify the model for the "owner" if needed (optional if it's already inferred)
    },
  });
  if (!user) return next(new appError("User not found", 404));
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const userById = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) return next(new appError("Invalid user id", 404));
  const userData = await User.findById(userId).populate({
    path: "savedBlogs",
    populate: {
      path: "owner", // This will populate the "owner" field in each blog
      model: "User", // Specify the model for the "owner" if needed (optional if it's already inferred)
    },
  });
  if (!userData) return next(new appError("Invalid user id", 404));

  res.status(200).json({
    status: "success",
    data: userData,
  });
});

export const editAbout = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const about = req.body.about;
  if (!userId) return next(new appError("Invalid user id", 404));
  if (!about) return next(new appError("About cannot be empty", 404));
  const user = await User.findById(userId);

  if (!user) return next(new appError("Invalid user id", 404));
  user.about = about;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "About updated succesfully",
    data: user,
  });
});
