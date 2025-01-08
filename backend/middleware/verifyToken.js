import jwt from "jsonwebtoken";
import config from "../config/config.js";
import appError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { promisify } from "util";
export default catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next(
      new appError("You are not logged in. Please log in first.", 401)
    );

  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);
  req.user = decoded;
  // console.log(req.user);
  next();
});
