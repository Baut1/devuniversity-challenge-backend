"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.getTasks = void 0;
const getTasks = (req, res) => {
    res.json({ message: 'List of tasks' });
};
exports.getTasks = getTasks;
const createTask = (req, res) => {
    const { title } = req.body;
    res.json({ message: `Task '${title}' created!` });
};
exports.createTask = createTask;
