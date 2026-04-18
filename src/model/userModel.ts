import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: Number, default: 1 }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);