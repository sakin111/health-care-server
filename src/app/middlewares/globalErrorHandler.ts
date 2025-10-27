import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = err.statusCode || err.status || httpStatus.INTERNAL_SERVER_ERROR;    let success = false;
    let message = err?.message || "Something went wrong!";
    let error = process.env.NODE_ENV === 'development' ? err : undefined;
    res.status(statusCode).json({
        success,
        message,
        error
    })
};

export default globalErrorHandler;