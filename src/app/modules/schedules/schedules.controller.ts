import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { schedulesService } from "./schedules.service";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
    const result = await schedulesService.insertIntoDb(req.body)
    sendResponse(res,{
       statusCode: 201,
       success:true,
       message:"Schedule created successfully",
       data: result
    })
}
)

export const schedulesController = {
insertIntoDb
}