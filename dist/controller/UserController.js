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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userModel_1 = require("../model/userModel");
const { isValidId } = require("../utils/validators");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }
        const user = yield userModel_1.User.create({ name, email, status: 1 });
        return res.status(201).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find({ status: 1 });
        return res.json({
            success: true,
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const user = yield userModel_1.User.findOne({ _id: id, status: 1 });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const user = yield userModel_1.User.findOneAndUpdate({ _id: id, status: 1 }, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or inactive",
            });
        }
        return res.json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }
        const user = yield userModel_1.User.findOneAndUpdate({ _id: id, status: 1 }, { status: -1 }, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or already deleted",
            });
        }
        return res.json({
            success: true,
            message: "User soft deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
