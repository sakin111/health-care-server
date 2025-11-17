
import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { IJwtPayload } from "../../Types/common";


const createAppointment = catchAsync(async (req: Request & {user?:IJwtPayload}, res: Response) => {

    const user = req.user 
    const result = await AppointmentService.createAppointment(user as IJwtPayload, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

export const AppointmentController = {
createAppointment
};