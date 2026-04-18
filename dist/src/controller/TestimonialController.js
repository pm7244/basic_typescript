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
exports.deleteTestimonial = exports.updateTestimonial = exports.getTestimonialById = exports.getTestimonials = exports.createTestimonial = void 0;
const testimonialModel_1 = require("../model/testimonialModel");
const { isValidId } = require("../utils/validators");
const createTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, message } = req.body;
        if (!name || !image || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, image and message are required",
            });
        }
        const testimonial = yield testimonialModel_1.Testimonial.create({ name, image, message, status: 1 });
        return res.status(201).json({
            success: true,
            data: testimonial,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createTestimonial = createTestimonial;
const getTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonialModel_1.Testimonial.find({ status: 1 });
        return res.json({
            success: true,
            count: testimonials.length,
            data: testimonials,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getTestimonials = getTestimonials;
const getTestimonialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const testimonial = yield testimonialModel_1.Testimonial.findOne({ _id: id, status: 1 });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getTestimonialById = getTestimonialById;
const updateTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const testimonial = yield testimonialModel_1.Testimonial.findOneAndUpdate({ _id: id, status: 1 }, req.body, { new: true, runValidators: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const testimonial = yield testimonialModel_1.Testimonial.findOneAndUpdate({ _id: id, status: 1 }, { status: -1 }, { new: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteTestimonial = deleteTestimonial;
