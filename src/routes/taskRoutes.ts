import { Router } from 'express';
import checkJwt from '../middlewares/authMiddleware'; // Importa el middleware de autenticación
import { getTasks, createTask, deleteTask } from '../controllers/taskController';

const router = Router();

// Rutas protegidas, solo usuarios autenticados pueden acceder
router.get('/api/tasks', checkJwt, getTasks);
router.post('/api/tasks', checkJwt, createTask);
router.delete('/api/tasks/:id', checkJwt, deleteTask);

export default router;
