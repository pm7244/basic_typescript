import mongoose from "mongoose";
import { Slider } from "../model/sliderModel";
const { isValidId } = require("../utils/validators");

// CREATE SLIDER
 const createSlider = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const slider = await Slider.create({
      title,
      image, 
      description,
      status: 1,
    });

    return res.status(201).json({
      success: true,
      data: slider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL SLIDERS
 const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({ status: 1 });

    return res.json({
      success: true,
      count: sliders.length,
      data: sliders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE SLIDER
 const getSliderById = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await Slider.findOne({ _id: id, status: 1 });

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    return res.json({
      success: true,
      data: slider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SLIDER
 const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await Slider.findOneAndUpdate(
      { _id: id, status: 1 },
      req.body,
      { new: true, runValidators: true }
    );

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    return res.json({
      success: true,
      data: slider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE SLIDER (soft delete)
const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await Slider.findOneAndUpdate(
      { _id: id, status: 1 },
      { status: -1 },
      { new: true }
    );

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    return res.json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { createSlider, getSliders, getSliderById, updateSlider, deleteSlider };