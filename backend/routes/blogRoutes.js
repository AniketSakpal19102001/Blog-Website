import express from "express";
import {
  createBlog,
  editBlog,
  toggleLike,
  addComment,
  getAllBlogs,
  getBlogsByTag,
  getBlogsByOwner,
  getBlogById,
  deleteBlog,
} from "../controllers/blogController.js";
import verifyToken from "../middleware/verifyToken.js";
import { upload } from "../middleware/multerMiddleware.js";
const router = express.Router();

router.post("/create", verifyToken, upload.single("image"), createBlog);
router.patch("/edit/:blogId", verifyToken, upload.single("image"), editBlog);
router.post("/like/:blogId", verifyToken, toggleLike);
router.post("/comment/:blogId", verifyToken, addComment);
router.get("/all", verifyToken, getAllBlogs);
router.get("/tag/:tag", verifyToken, getBlogsByTag);
router.get("/owner/:ownerId", verifyToken, getBlogsByOwner);
router.delete("/delete/:blogId", verifyToken, deleteBlog);
router.get("/:blogId", verifyToken, getBlogById);
export default router;
