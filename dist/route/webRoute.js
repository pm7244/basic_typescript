"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webController_1 = require("../controller/webController");
const router = express_1.default.Router();
// Web Routes
router.get("/", webController_1.renderHomePage);
router.get("/users", webController_1.renderUsersPage);
router.get("/sliders", webController_1.renderSlidersPage);
router.get("/testimonials", webController_1.renderTestimonialsPage);
exports.default = router;
