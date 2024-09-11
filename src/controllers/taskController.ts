import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { handleError } from '../utils/errorHandler';

export const createTask = async (req: Request, res: Response) => {
  try {
    const createdTask = await taskService.createTask(req.body);
    res.status(201).json(createdTask);
  } catch (error) {
    handleError(res, error, 'Failed to create task');
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    handleError(res, error, 'Failed to fetch tasks');
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await taskService.updateTaskStatus(id, status);
    res.json(updatedTask);
  } catch (error) {
    handleError(res, error, 'Failed to update task status');
  }
};
