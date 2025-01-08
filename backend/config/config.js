import dotenv from "dotenv";

dotenv.config();
const config = {
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
};
export default config;
