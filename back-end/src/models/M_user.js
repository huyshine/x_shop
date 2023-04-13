import mongoose from "mongoose";
// import { createHmac } from "crypto";
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: Number,
      default: 0,
    },
  },{ timestamps: true });


export default mongoose.model("User", userSchema);
