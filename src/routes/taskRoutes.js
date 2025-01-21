"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Importa el middleware de autenticación
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// Rutas protegidas, solo usuarios autenticados pueden acceder
router.get('/api/tasks', authMiddleware_1.default, taskController_1.getTasks);
router.post('/api/tasks', authMiddleware_1.default, taskController_1.createTask);
router.delete('/api/tasks/:id', authMiddleware_1.default, taskController_1.deleteTask);
exports.default = router;
