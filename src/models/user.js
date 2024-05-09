const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dtsfrv4lf/image/upload/v1715251639/avatar-trang-4_vdirm3.jpg",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports= mongoose.model("User", userSchema);
