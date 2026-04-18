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
exports.renderSlidersPage = void 0;
const sliderModel_1 = require("../model/sliderModel");
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
