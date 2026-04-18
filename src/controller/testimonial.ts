import { Request, Response } from "express";
import { Testimonial } from "../model/testimonialModel";

export const renderTestimonialsPage = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find({ status: 1 }).sort({ createdAt: -1 });

    res.render("pages/testimonials", {
      title: "Testimonials",
      testimonials
    });
  } catch (error: any) {
    res.status(500).send("Server Error: " + error.message);
  }
};