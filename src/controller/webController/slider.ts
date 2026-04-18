import { Request, Response } from "express";
import { Slider } from "../../model/sliderModel";

export const renderSlidersPage = async (req: Request, res: Response) => {
  try {
    const sliders = await Slider.find({ status: 1 }).sort({ createdAt: -1 });

    res.render("pages/sliders", {
      title: "Sliders",
      sliders
    });
  } catch (error: any) {
    res.status(500).send("Server Error: " + error.message);
  }
};