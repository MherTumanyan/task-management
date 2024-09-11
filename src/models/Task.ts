import mongoose from 'mongoose';

enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum Status {
  Pending = 'pending',
  Completed = 'completed',
}

export interface ITask extends mongoose.Document {
  title: string;
  description: string;
  priority: Priority;
  assignedMember: string;
  status: Status;
  createdAt: Date;
  completedAt?: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: Object.values(Priority), required: true },
  assignedMember: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.Pending,
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
