import Task, { ITask, Status } from '../models/Task';

export const createTask = async (taskData: any) => {
  const task = new Task(taskData);
  return await task.save();
};

export const getAllTasks = async () => {
  return await Task.find();
};

export const updateTaskStatus = async (id: string, status: ITask['status']) => {
  const updateData: Partial<ITask> = { status };

  if (status === Status.Completed) {
    updateData.completedAt = new Date(); // Set completion timestamp when status changes to 'completed'
  }

  return await Task.findByIdAndUpdate(id, updateData, { new: true });
};
