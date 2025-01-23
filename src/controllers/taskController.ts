import { Request, Response } from 'express';
import Task from '../models/Task';

// GET
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const userId = req.auth?.sub; // get from token
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// POST
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  const userId = req.auth?.sub; // auth0 user

  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    const newTask = new Task({
      title,
      completed: false,
      userId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// DELETE
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.auth?.sub; // auth0 user

  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId }); // Aseguramos que coincida con el userId
    if (!task) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
