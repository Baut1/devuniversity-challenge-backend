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

// GET: Obtener una tarea específica por ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // ID de la tarea
  const userId = req.auth?.sub; // ID del usuario desde el token

  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    // Busca la tarea asegurándose de que pertenezca al usuario
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
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

// PATCH: update a task when completed or not
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // ID of the task to update
  const { completed } = req.body; // new state (true/false)
  const userId = req.auth?.sub; // obtain ID of user from token

  // Check if user was found
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    // find and update task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId }, // making sure the task belongs to the user
      { completed }, // updating the completed field
      { new: true } // returning the updated task
    );    

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
};
