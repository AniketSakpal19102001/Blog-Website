import express from "express";
import config from "./config/config.js";
import dbConnect from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import appError from "./utils/appError.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = config.PORT;
const corsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
};
dbConnect();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors(corsOptions));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.all("*", (req, res, next) => {
  next(new appError(`Cant find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
