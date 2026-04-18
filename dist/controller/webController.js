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
exports.renderTestimonialsPage = exports.renderSlidersPage = exports.renderUsersPage = exports.renderHomePage = void 0;
const userModel_1 = require("../model/userModel");
const sliderModel_1 = require("../model/sliderModel");
const testimonialModel_1 = require("../model/testimonialModel");
// Render Home Page
const renderHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sliders = yield sliderModel_1.Slider.find({ status: 1 }).limit(5);
        const users = yield userModel_1.User.find({ status: 1 }).limit(6);
        const testimonials = yield testimonialModel_1.Testimonial.find({ status: 1 }).limit(4);
        res.render("pages/home", {
            title: "Home",
            sliders,
            users,
            testimonials
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
exports.renderHomePage = renderHomePage;
// Render Users Page
const renderUsersPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find({ status: 1 }).sort({ createdAt: -1 });
        res.render("pages/users", {
            title: "Users",
            users
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
exports.renderUsersPage = renderUsersPage;
// Render Sliders Page
const renderSlidersPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sliders = yield sliderModel_1.Slider.find({ status: 1 }).sort({ createdAt: -1 });
        res.render("pages/sliders", {
            title: "Sliders",
            sliders
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
exports.renderSlidersPage = renderSlidersPage;
// Render Testimonials Page
const renderTestimonialsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonialModel_1.Testimonial.find({ status: 1 }).sort({ createdAt: -1 });
        res.render("pages/testimonials", {
            title: "Testimonials",
            testimonials
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
exports.renderTestimonialsPage = renderTestimonialsPage;
