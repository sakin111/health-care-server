import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { schedulesService } from "./schedules.service";
import { IJwtPayload } from "../../Types/common";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
    const result = await schedulesService.insertIntoDb(req.body)
    sendResponse(res,{
       statusCode: 201,
       success:true,
       message:"Schedule created successfully",
       meta:result.meta,
       data: result.data
    })
}
)

const scheduleForDoctor = catchAsync(async (req: Request & {user?:IJwtPayload}, res: Response) => {
     const option = pick(req.query,["page","limit","sortBy","sortOrder"]);
     const filter = pick(req.query, ["startDateTime","endDateTime"])
     const user = req.user
    const result = await schedulesService.scheduleForDoctor(option, filter, user as IJwtPayload)
    sendResponse(res,{
       statusCode: 200,
       success:true,
       message:"Schedule fetched successfully",
       meta:result.meta,
       data: result.data
    })
}
)

const deleteScheduleFromDb = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await schedulesService.deleteScheduleFromDb(id)
    sendResponse(res,{
       statusCode: 200,
       success:true,
       message:"Schedule deleted successfully",
       data: result
    })
}
)

export const schedulesController = {
insertIntoDb,
scheduleForDoctor,
deleteScheduleFromDb
}