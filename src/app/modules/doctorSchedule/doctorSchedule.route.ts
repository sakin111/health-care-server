import express from 'express';
import { doctorScheduleController } from './doctorSchedule.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorScheduleValidation } from './doctorSchedule.validation';






const router = express.Router();

router.post("/doctor-schedule", auth(UserRole.DOCTOR),
validateRequest(DoctorScheduleValidation.createDoctorScheduleValidation),
doctorScheduleController.doctorInsertIntoDb)


export const DoctorSchedule = router;