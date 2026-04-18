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
exports.renderHomePage = void 0;
const testimonialModel_1 = require("../model/testimonialModel");
const serviceModel_1 = require("../model/serviceModel");
const renderHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonialModel_1.Testimonial.find({ status: 1 });
        const services = yield serviceModel_1.Service.find({ status: 1 });
        res.render("include/home", {
            title: "Home",
            testimonials,
            services,
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
exports.renderHomePage = renderHomePage;
