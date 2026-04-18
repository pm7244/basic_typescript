import { Request, Response } from "express";
import { Service } from "../model/serviceModel";
;
const { isValidId } = require("../utils/validators");

// CREATE
const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({
        success: false,
        message: "Title, description and icon are required",
      });
    }

    const service = await Service.create({
      title,
      description,
      icon,
      status: 1,
    });

    return res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ status: 1 });

    return res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const service = await Service.findOne({
      _id: id,
      status: 1,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const service = await Service.findOneAndUpdate(
      { _id: id, status: 1 },
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found or inactive",
      });
    }

    return res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE 
const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const service = await Service.findOneAndUpdate(
      { _id: id, status: 1 },
      { status: -1 },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found or already deleted",
      });
    }

    return res.json({
      success: true,
      message: "Service soft deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
  
