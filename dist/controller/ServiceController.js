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
exports.deleteService = exports.updateService = exports.getServiceById = exports.getServices = exports.createService = void 0;
const serviceModel_1 = require("../model/serviceModel");
;
const { isValidId } = require("../utils/validators");
// CREATE
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, icon } = req.body;
        if (!title || !description || !icon) {
            return res.status(400).json({
                success: false,
                message: "Title, description and icon are required",
            });
        }
        const service = yield serviceModel_1.Service.create({
            title,
            description,
            icon,
            status: 1,
        });
        return res.status(201).json({
            success: true,
            data: service,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createService = createService;
// GET ALL
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield serviceModel_1.Service.find({ status: 1 });
        return res.json({
            success: true,
            count: services.length,
            data: services,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getServices = getServices;
// GET BY ID
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const service = yield serviceModel_1.Service.findOne({
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getServiceById = getServiceById;
// UPDATE
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const service = yield serviceModel_1.Service.findOneAndUpdate({ _id: id, status: 1 }, req.body, { new: true, runValidators: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateService = updateService;
// DELETE 
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const service = yield serviceModel_1.Service.findOneAndUpdate({ _id: id, status: 1 }, { status: -1 }, { new: true });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteService = deleteService;
