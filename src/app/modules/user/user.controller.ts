import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req)
    sendResponse(res,{
       statusCode: 201,
       success:true,
       message:"Patient created successfully",
       data: result
    })
}
)
const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createDoctor(req)
    sendResponse(res,{
       statusCode: 201,
       success:true,
       message:"Doctor created successfully",
       data: result
    })
}
)
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAdmin(req)
    sendResponse(res,{
       statusCode: 201,
       success:true,
       message:"Admin created successfully",
       data: result
    })
}
)
const AllUser = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query,["status","role","email","searchTerm"])
    const option = pick(req.query,["page","limit","sortBy","sortOrder"])

    const result = await UserService.getAllUser(filter, option)
    sendResponse(res,{
       statusCode: 200,
       success:true,
       message:"Patient retrieve successfully",
       meta: result.meta,
       data: result.data
    })
}
)


export const UserController = {
 createPatient,
 createDoctor,
 createAdmin,
 AllUser
}