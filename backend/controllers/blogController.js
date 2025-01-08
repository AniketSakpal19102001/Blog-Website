import Blog from "../models/blogModel.js";
import appError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createBlog = catchAsync(async (req, res, next) => {
  const owner = req.user.id;
  const { title, tags, content } = req.body;
  if (!req.file) return next(new appError("Failed to upload image", 400));

  if (!title || !content || !owner) {
    return next(new appError("All required fields must be filled", 400));
  }

  const response = await uploadOnCloudinary(req.file.path);
  console.log(response);
  if (!response) return next(new appError("Upload fail", 500));
  const newBlog = new Blog({
    title,
    tags,
    imgSrc: response.url,
    content,
    owner,
  });

  try {
    await newBlog.save();
  } catch (error) {
    return next(new appError("Failed to save blog to the database", 500));
  }

  res.status(201).json({
    status: "success",
    message: "Blog created successfully.",
    data: newBlog,
  });
});

// Edit an existing blog
export const editBlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const { title, tags, content } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new appError("Blog not found", 404));
  }

  // Ensure the blog owner is the same as the logged-in user
  if (blog.owner.toString() !== req.user.id) {
    return next(
      new appError("You do not have permission to edit this blog", 403)
    );
  }

  // Check if a new image file is uploaded
  if (req.file) {
    // Upload the new image to Cloudinary
    const response = await uploadOnCloudinary(req.file.path);
    if (!response) {
      console.error("Cloudinary upload failed for file:", req.file.path);
      return next(new appError("Image upload failed. Please try again.", 500));
    }

    // Update imgSrc with the new image URL from Cloudinary
    blog.imgSrc = response.url;
  }

  // Update other blog fields if provided
  blog.title = title || blog.title;
  blog.tags = tags || blog.tags;
  blog.content = content || blog.content;

  await blog.save();

  res.status(200).json({
    status: "success",
    message: "Blog updated successfully.",
    data: blog,
  });
});

// Toggle like on a blog
export const toggleLike = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new appError("Blog not found", 404));
  }

  const userId = req.user.id; // assuming req.user contains the authenticated user

  const hasLiked = blog.likes.includes(userId);

  if (hasLiked) {
    // Remove like
    blog.likes = blog.likes.filter((user) => user.toString() !== userId);
  } else {
    // Add like
    blog.likes.push(userId);
  }

  await blog.save();

  res.status(200).json({
    status: "success",
    message: `Blog ${hasLiked ? "unliked" : "liked"} successfully.`,
    data: {
      like: blog.likes.length,
      likeList: blog.likes,
    },
  });
});

// Add a comment to a blog
export const addComment = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return next(new appError("Comment cannot be empty", 400));
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new appError("Blog not found", 404));
  }

  const newComment = {
    user: req.user.id, // Assuming req.user contains authenticated user info
    comment,
  };

  blog.comments.unshift(newComment);

  await blog.save();

  res.status(200).json({
    status: "success",
    message: "Comment added successfully.",
    data: blog.comments,
  });
});

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().sort({ datePosted: -1 }).populate("owner"); // Sort by most recent

  res.status(200).json({
    status: "success",
    message: "Fetched all blogs successfully.",
    data: blogs,
  });
});

// Get blogs by tag name
export const getBlogsByTag = catchAsync(async (req, res, next) => {
  const { tag } = req.params;

  if (!tag) {
    return next(new appError("Tag name is required", 400));
  }

  const blogs = await Blog.find({ tags: { $in: [tag] } })
    .sort({
      datePosted: -1,
    })
    .populate("owner");

  res.status(200).json({
    status: "success",
    message: `Fetched blogs with the tag "${tag}" successfully.`,
    data: blogs,
  });
});

export const getBlogsByOwner = catchAsync(async (req, res, next) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    return next(new appError("Owner ID is required", 400));
  }

  const blogs = await Blog.find({ owner: ownerId }).populate("owner").sort({
    datePosted: -1,
  });

  res.status(200).json({
    status: "success",
    message: "Fetched blogs by owner successfully.",
    data: blogs,
  });
});

// Get a single blog by ID
export const getBlogById = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId)
    .populate("owner")
    .populate("comments.user");

  if (!blog) {
    return next(new appError("Blog not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Fetched blog successfully.",
    data: blog,
  });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findByIdAndDelete(blogId);

  if (!blog) {
    return next(new appError("Blog not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Blog deleted successfully",
    data: blog,
  });
});
