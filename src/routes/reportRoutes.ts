import { Router } from 'express';
import { getReport } from '../controllers/reportController';

const reportRouter = Router();

reportRouter.get('/report', getReport);

export default reportRouter;
