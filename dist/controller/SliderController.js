"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSlider = exports.updateSlider = exports.getSliderById = exports.getSliders = exports.createSlider = void 0;
const sliderModel_1 = require("../model/sliderModel");
const { isValidId } = require("../utils/validators");
// CREATE SLIDER
const createSlider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image, description } = req.body;
        if (!title || !image || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const slider = yield sliderModel_1.Slider.create({
            title,
            image,
            description,
            status: 1,
        });
        return res.status(201).json({
            success: true,
            data: slider,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createSlider = createSlider;
// GET ALL SLIDERS
const getSliders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sliders = yield sliderModel_1.Slider.find({ status: 1 });
        return res.json({
            success: true,
            count: sliders.length,
            data: sliders,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getSliders = getSliders;
// GET SINGLE SLIDER
const getSliderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const slider = yield sliderModel_1.Slider.findOne({ _id: id, status: 1 });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getSliderById = getSliderById;
// UPDATE SLIDER
const updateSlider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const slider = yield sliderModel_1.Slider.findOneAndUpdate({ _id: id, status: 1 }, req.body, { new: true, runValidators: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateSlider = updateSlider;
// DELETE SLIDER (soft delete)
const deleteSlider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const slider = yield sliderModel_1.Slider.findOneAndUpdate({ _id: id, status: 1 }, { status: -1 }, { new: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteSlider = deleteSlider;
