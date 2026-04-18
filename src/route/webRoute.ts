import express from "express";
import { renderHomePage } from "../controller/webController";

const router = express.Router();

router.get("/", renderHomePage);

export default router;