"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const testimonialSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, default: null },
    rating: { type: Number, default: 5 },
    status: { type: Number, default: 1 }
}, { timestamps: true });
exports.Testimonial = mongoose_1.default.model("Testimonial", testimonialSchema);
