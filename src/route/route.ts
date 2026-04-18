import express from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/UserController";

import {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "../controller/TestimonialController";

import {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
} from "../controller/SliderController";

import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controller/ServiceController";

const router = express.Router();

/* ================= USER ================= */
router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

/* ================= TESTIMONIAL ================= */
router.post("/createTestimonial", createTestimonial);
router.get("/getTestimonials", getTestimonials);
router.get("/getTestimonialById/:id", getTestimonialById);
router.put("/updateTestimonial/:id", updateTestimonial);
router.delete("/deleteTestimonial/:id", deleteTestimonial);

/* ================= SLIDER ================= */
router.post("/createSlider", createSlider);
router.get("/getSliders", getSliders);
router.get("/getSliderById/:id", getSliderById);
router.put("/updateSlider/:id", updateSlider);
router.delete("/deleteSlider/:id", deleteSlider);


/* ================= SERVICE ================= */
router.post("/createService", createService);
router.get("/getServices", getServices);
router.get("/getServiceById/:id", getServiceById);
router.put("/updateService/:id", updateService);
router.delete("/deleteService/:id", deleteService);



export default router;