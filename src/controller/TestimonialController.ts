import mongoose from "mongoose";
import { Testimonial } from "../model/testimonialModel";
const { isValidId } = require("../utils/validators");

 const createTestimonial = async (req, res) => {
  try {
    const { name, image, message } = req.body;

    if (!name || !image || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, image and message are required",
      });
    }

    const testimonial = await Testimonial.create({ name, image, message, status: 1 });

    return res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 1 });

    return res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const testimonial = await Testimonial.findOne({ _id: id, status: 1 });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: id, status: 1 },
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found or inactive",
      });
    }

    return res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: id, status: 1 },
      { status: -1 },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found or already deleted",
      });
    }

    return res.json({
      success: true,
      message: "Testimonial soft deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial };