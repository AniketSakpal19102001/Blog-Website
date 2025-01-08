import config from "../config/config.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_SECRET_KEY,
});

export async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    console.log("File Uploaded", response.url);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
}
