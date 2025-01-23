import { Router } from 'express';
import checkJwt from '../middlewares/authMiddleware'; // import auth middleware
import { getTasks, createTask, deleteTask } from '../controllers/taskController';

const router = Router();

// get all tasks
router.get('/api/tasks', checkJwt, getTasks);

// post new task
router.post('/api/tasks', checkJwt, createTask);

// delete task
router.delete('/api/tasks/:id', checkJwt, deleteTask);

export default router;
