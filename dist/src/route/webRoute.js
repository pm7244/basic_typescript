"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webController_1 = require("../controller/webController");
const router = express_1.default.Router();
router.get("/", webController_1.renderHomePage);
exports.default = router;
