import { Router } from 'express';
import { getTasks, createTask } from '../controllers/taskController';

const router = Router();

router.get('/api/tasks', getTasks);
router.post('/api/tasks', createTask);

export default router;
