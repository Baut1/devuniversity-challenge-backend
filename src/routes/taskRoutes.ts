import { Router } from 'express';
import checkJwt from '../middlewares/authMiddleware'; // import auth middleware
import { getTasks, getTaskById, createTask, deleteTask, updateTask } from '../controllers/taskController';

const router = Router();

// get all tasks
router.get('/api/tasks', checkJwt, getTasks);

 // Obtener una tarea específica
router.get('/api/tasks/:id', checkJwt, getTaskById);

// post new task
router.post('/api/tasks', checkJwt, createTask);

// delete task
router.delete('/api/tasks/:id', checkJwt, deleteTask);

// PATCH task
router.patch('/api/tasks/:id', checkJwt, updateTask);

export default router;
