import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import pick from "../../helper/pick";
import { DoctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";
import { doctorFilterableFields } from "./doctor.constant";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, doctorFilterableFields)

    const result = await DoctorService.getAllFromDB(fillters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor fetched successfully!",
        meta: result.meta,
        data: result.data
    })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await DoctorService.updateIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor updated successfully!",
        data: result
    })
})


const deleteDoctor = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await DoctorService.deleteDoctor(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor deleted successfully!",
        data: result
    })
})

const getDoctorById = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await DoctorService.getDoctorById(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor fetched successfully!",
        data: result
    })
})

const suggestions = catchAsync(async (req: Request, res: Response) => {

    const result = await DoctorService.suggestions(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "AI symptom suggestions fetched successfully!",
        data: result
    })
})


export const DoctorController = {
    getAllFromDB,
    updateIntoDB,
    deleteDoctor,
    suggestions,
    getDoctorById
}