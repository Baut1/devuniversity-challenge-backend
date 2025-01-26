"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // import auth middleware
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// get all tasks
router.get('/api/tasks', authMiddleware_1.default, taskController_1.getTasks);
// Obtener una tarea específica
router.get('/api/tasks/:id', authMiddleware_1.default, taskController_1.getTaskById);
// post new task
router.post('/api/tasks', authMiddleware_1.default, taskController_1.createTask);
// delete task
router.delete('/api/tasks/:id', authMiddleware_1.default, taskController_1.deleteTask);
// PATCH task´s status
router.patch('/api/tasks/:id', authMiddleware_1.default, taskController_1.updateTaskStatus);
exports.default = router;
