import { Request, Response } from "express";
import { Testimonial } from "../model/testimonialModel";
import { Service } from "../model/serviceModel";

export const renderHomePage = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find({ status: 1 });
    const services = await Service.find({ status: 1 });



    res.render("include/home", {
      title: "Home",
      testimonials,
        services,
    });
  } catch (error: any) {
    res.status(500).send("Server Error: " + error.message);
  }
};


