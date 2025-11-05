import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../helper/fileUploader';

import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import { UserValidation } from './user.validation';


const router = express.Router();

router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
     UserController.createPatient(req, res, next)
    },
),
router.post(
    "/create-doctor",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data))
     UserController.createDoctor(req, res, next)
    },
),
router.post(
    "/create-admin",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
     UserController.createAdmin(req, res, next)
    },
),
router.get(
    "/allUser",auth(UserRole.ADMIN), UserController.AllUser
)


export const userRouter = router;