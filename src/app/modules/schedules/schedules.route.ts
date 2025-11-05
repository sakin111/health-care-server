import express from 'express';

import { schedulesController } from './schedules.controller';


const router = express.Router();

router.post("/schedules",  schedulesController.insertIntoDb)



export const scheduleRouter = router;