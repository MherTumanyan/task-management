import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from '../controllers/taskController';
import { validateTask } from '../validators/taskValidator';

const taskRouter = Router();

taskRouter.post('/tasks', validateTask, createTask);
taskRouter.get('/tasks', getTasks);
taskRouter.patch('/tasks/:id/status', updateTaskStatus);

export default taskRouter;
