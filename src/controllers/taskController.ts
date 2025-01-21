import { Request, Response } from 'express';
import Task from '../models/Task';

// GET
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try { 
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {      
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  };

// POST
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// DELETE
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };
