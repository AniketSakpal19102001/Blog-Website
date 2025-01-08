import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true, // The notification message
    },
    date: {
      type: Date,
      default: Date.now, // The date the notification was created
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    // Embed the notification schema as an array
    notifications: [notificationSchema], // This embeds notifications directly
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User that is being followed
      },
    ],
    followed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who follow this user
      },
    ],
    savedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog", // Assuming you have a Blog model
      },
    ],
    followedTags: [
      {
        type: String, // The tag followed by the user
      },
    ],
    about: {
      type: String, // The about field for user description
      default: "", // Optional: provide a default value
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password comparison method
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    return await bcrypt.compare(plainPassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// User Model
const User = mongoose.model("User", userSchema);

export default User;

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// // Notification Schema
// const notificationSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true, // The notification message
//     },
//     date: {
//       type: Date,
//       default: Date.now, // The date the notification was created
//     },
//   },
//   {
//     timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
//   }
// );

// // User Schema
// const userSchema = new mongoose.Schema(
//   {
//     fName: {
//       type: String,
//       required: true,
//     },
//     lName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         "Please use a valid email address",
//       ],
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: [6, "Password must be at least 6 characters long"],
//       select: false,
//     },
//     // Embed the notification schema as an array
//     notifications: [notificationSchema], // This embeds notifications directly
//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", // User that is being followed
//       },
//     ],
//     followed: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", // Users who follow this user
//       },
//     ],
//     savedBlogs: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Blog", // Assuming you have a Blog model
//       },
//     ],
//     followedTags: [
//       {
//         type: String, // The tag followed by the user
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Password comparison method
// userSchema.methods.comparePassword = async function (plainPassword) {
//   try {
//     return await bcrypt.compare(plainPassword, this.password);
//   } catch (error) {
//     throw new Error("Error comparing passwords");
//   }
// };

// // User Model
// const User = mongoose.model("User", userSchema);

// export default User;
