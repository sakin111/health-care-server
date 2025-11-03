import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../helper/fileUploader';
import { userValidation } from './user.validation';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = userValidation.createPatientSchema.parse(JSON.parse(req.body.data))
     UserController.createPatient(req, res, next)
    },
),
router.post(
    "/create-doctor",
    auth(UserRole.DOCTOR),
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = userValidation.createPatientSchema.parse(JSON.parse(req.body.data))
     UserController.createDoctor(req, res, next)
    },
),
router.post(
    "/create-admin",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = userValidation.createPatientSchema.parse(JSON.parse(req.body.data))
     UserController.createAdmin(req, res, next)
    },
),
router.get(
    "/allUser",auth(UserRole.ADMIN), UserController.AllUser
)


export const userRouter = router;