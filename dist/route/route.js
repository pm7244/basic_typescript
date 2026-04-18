"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const TestimonialController_1 = require("../controller/TestimonialController");
const SliderController_1 = require("../controller/SliderController");
const router = express_1.default.Router();
/* ================= USER ================= */
router.post("/createUser", UserController_1.createUser);
router.get("/getUsers", UserController_1.getUsers);
router.get("/getUserById/:id", UserController_1.getUserById);
router.put("/updateUser/:id", UserController_1.updateUser);
router.delete("/deleteUser/:id", UserController_1.deleteUser);
/* ================= TESTIMONIAL ================= */
router.post("/createTestimonial", TestimonialController_1.createTestimonial);
router.get("/getTestimonials", TestimonialController_1.getTestimonials);
router.get("/getTestimonialById/:id", TestimonialController_1.getTestimonialById);
router.put("/updateTestimonial/:id", TestimonialController_1.updateTestimonial);
router.delete("/deleteTestimonial/:id", TestimonialController_1.deleteTestimonial);
/* ================= SLIDER ================= */
router.post("/createSlider", SliderController_1.createSlider);
router.get("/getSliders", SliderController_1.getSliders);
router.get("/getSliderById/:id", SliderController_1.getSliderById);
router.put("/updateSlider/:id", SliderController_1.updateSlider);
router.delete("/deleteSlider/:id", SliderController_1.deleteSlider);
exports.default = router;
