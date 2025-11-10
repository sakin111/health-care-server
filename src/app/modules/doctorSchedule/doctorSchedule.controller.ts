import { Request, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import {  doctorScheduleService } from "./doctorSchedule.service";
import { IJwtPayload } from "../../Types/common";


const doctorInsertIntoDb = catchAsync(async (req: Request& {user?:IJwtPayload}, res: Response) => {
    const user = req.user;
    const result = await doctorScheduleService.doctorInsertIntoDb(req.body, user as IJwtPayload)
    sendResponse(res,{
       statusCode: 201,
       success:true,
       message:"Doctor Schedule created successfully",
       data: result
    })
}
)


export const doctorScheduleController = {
doctorInsertIntoDb
}