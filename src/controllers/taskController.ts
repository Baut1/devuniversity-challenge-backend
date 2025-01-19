import { Request, Response } from 'express';

// GET
export const getTasks = (res: Response) => {
  res.json({ message: 'List of tasks' });
};

// POST
export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;
  res.json({ message: `Task '${title}' created!` });
};
