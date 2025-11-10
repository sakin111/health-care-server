import express from 'express';

import { schedulesController } from './schedules.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();

router.post("/getScheduleDoctor",auth(UserRole.DOCTOR, UserRole.ADMIN),  schedulesController.scheduleForDoctor)
router.post("/PostSchedules", auth(UserRole.ADMIN), schedulesController.insertIntoDb)
router.delete("/DeleteSchedules/:id",auth(UserRole.ADMIN), schedulesController.deleteScheduleFromDb)



export const scheduleRouter = router;