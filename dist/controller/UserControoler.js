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
const { User } = require("../model/userModel");
// CREATE
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const user = yield User.create({
            name, email
        });
        res.status(201).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createUser = createUser;
// GET ALL
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find({ status: { $ne: -1 } });
    res.json({ success: true, data: users });
});
exports.getUsers = getUsers;
// GET BY ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(req.params.id);
    res.json({ success: true, data: user });
});
exports.getUserById = getUserById;
// UPDATE
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: user });
});
exports.updateUser = updateUser;
// DELETE (soft delete)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findByIdAndUpdate(req.params.id, { status: -1 }, { new: true });
    res.json({ success: true, message: "Deleted" });
});
exports.deleteUser = deleteUser;
// EXPORT ALL
module.exports = {
    createUser: exports.createUser,
    getUsers: exports.getUsers,
    getUserById: exports.getUserById,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser
};
