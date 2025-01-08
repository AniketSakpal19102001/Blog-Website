import express from "express";
import {
  addFollowing,
  addToSaved,
  getNotifications,
  handleLogin,
  handleLogout,
  handleRegister,
  removeFollowing,
  removeNotifications,
  removeSaved,
  getProfile,
  userById,
  editAbout,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", verifyToken, handleLogout);
router.post("/follow/:userId", verifyToken, addFollowing);
router.patch("/unfollow/:userId", verifyToken, removeFollowing);
router.get("/notification", verifyToken, getNotifications);
router.patch("/notification", verifyToken, removeNotifications);
router.get("/profile", verifyToken, getProfile);
router.post("/addSaved", verifyToken, addToSaved);
router.patch("/removeSaved", verifyToken, removeSaved);
router.patch("/about", verifyToken, editAbout);
router.get("/:userId", verifyToken, userById);
export default router;
