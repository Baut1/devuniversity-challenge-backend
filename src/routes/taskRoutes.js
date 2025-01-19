"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.get('/api/tasks', taskController_1.getTasks);
router.post('/api/tasks', taskController_1.createTask);
router.delete('/api/tasks/:id', taskController_1.deleteTask);
exports.default = router;
