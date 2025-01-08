import mongoose from "mongoose";
import express from "express";
import config from "./config.js";

const url = config.DB_URL;
async function dbConnect() {
  try {
    await mongoose.connect(url);
    console.log("database connected");
  } catch (err) {
    console.log("failed to connect database", err);
  }
}

export default dbConnect;
