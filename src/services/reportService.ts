import Task from '../models/Task';

const parseTimePeriod = (period: string) => {
  switch (period) {
    case 'week':
      return 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    case 'month':
      return 30 * 24 * 60 * 60 * 1000; // One month in milliseconds
    case 'year':
      return 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
    default:
      throw new Error('Invalid time period');
  }
};

const formatTime = (ms: number) => {
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''} ${milliseconds} millisecond${milliseconds !== 1 ? 's' : ''}`;
};

export const generateReport = async (
  timePeriod?: string,
  teamMember?: string
) => {
  try {
    const filter: any = {};

    if (timePeriod) {
      const now = new Date();
      const startDate = new Date(now.getTime() - parseTimePeriod(timePeriod));
      filter.completedAt = { $gte: startDate, $lte: now };
    }

    if (teamMember) {
      filter.assignedMember = teamMember;
    }

    const tasks = await Task.find(filter);

    // Check if no tasks were found
    if (tasks.length === 0) {
      return {
        message: 'No tasks found for the given filter',
        totalTasks: 0,
        averageCompletionTime: 'N/A',
      };
    }

    const completedTasks = tasks.filter((task) => task.status === 'completed');

    const totalCompletionTime = completedTasks.reduce((total, task) => {
      const taskCompletionTime =
        task.completedAt!.getTime() - task.createdAt!.getTime();
      return total + taskCompletionTime;
    }, 0);

    const averageCompletionTimeMs = completedTasks.length
      ? totalCompletionTime / completedTasks.length
      : 0;
    const formattedTime = formatTime(averageCompletionTimeMs);

    const report = {
      totalTasks: completedTasks.length,
      averageCompletionTime: formattedTime,
    };

    return report;
  } catch (error) {
    throw new Error('Failed to generate report');
  }
};
