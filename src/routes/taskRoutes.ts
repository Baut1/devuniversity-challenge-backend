import { Router } from 'express';
import { getTasks, createTask, deleteTask } from '../controllers/taskController';

const router = Router();

router.get('/api/tasks', getTasks);
router.post('/api/tasks', createTask);
router.delete('/api/tasks/:id', deleteTask);

export default router;
