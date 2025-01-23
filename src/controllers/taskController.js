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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// GET
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // get from token
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        const tasks = yield Task_1.default.find({ userId });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});
exports.getTasks = getTasks;
// POST
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title } = req.body;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // auth0 user
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        const newTask = new Task_1.default({
            title,
            completed: false,
            userId,
        });
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});
exports.createTask = createTask;
// DELETE
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // auth0 user
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        const task = yield Task_1.default.findOneAndDelete({ _id: id, userId }); // Aseguramos que coincida con el userId
        if (!task) {
            res.status(404).json({ message: 'Task not found or unauthorized' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});
exports.deleteTask = deleteTask;
