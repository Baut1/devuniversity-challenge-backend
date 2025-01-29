import mongoose, { Document, Schema } from 'mongoose';

// interface
export interface TaskDocument extends Document {
  title: string;
  completed: boolean;
  userId: string; // user unique id (Auth0 `sub`)
}

// mongoose schema
const TaskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true } // includes createdAt and updatedAt automatically
);

const Task = mongoose.model<TaskDocument>('Task', TaskSchema);

export default Task;
