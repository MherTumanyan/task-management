import { Request, Response } from 'express';
import { generateReport } from '../services/reportService';

export const getReport = async (req: Request, res: Response) => {
  try {
    const { timePeriod, teamMember } = req.query;
    const report = await generateReport(
      timePeriod as string,
      teamMember as string
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
};
