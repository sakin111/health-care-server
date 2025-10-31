import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../helper/fileUploader';
import { userValidation } from './user.validation';


const router = express.Router();

router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req:Request, res:Response, next:NextFunction) => {
     req.body = userValidation.createPatientSchema.parse(JSON.parse(req.body.data))
     UserController.createPatient(req, res, next)
    },
)


export const userRouter = router;