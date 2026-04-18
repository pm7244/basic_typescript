import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, default: null },
  rating: { type: Number, default: 5 },
  status: { type: Number, default: 1 }
}, { timestamps: true });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);