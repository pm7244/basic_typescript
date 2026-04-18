import express from "express";
import { getHomePage } from "../controller/webController/home";

const router = express.Router();

router.get("/", getHomePage);

export default router;