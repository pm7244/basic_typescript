import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true},
  description: { type: String, required: true },
  status: { type: Number, default: 1 }
}, { timestamps: true });

export const Slider = mongoose.model("Slider", sliderSchema);