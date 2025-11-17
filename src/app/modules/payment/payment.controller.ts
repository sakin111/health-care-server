
import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJwtPayload } from "../../Types/common";
import { PaymentService } from "./payment.service";
import { stripe } from "../../helper/stripe";


const createPayment = catchAsync(async (req: Request & {user?:IJwtPayload}, res: Response) => {

    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = "whsec_3c1922c0e9ccd96fe1c65fe0e70c470adf13c1e94f608f43a06ca335d6c1697b"

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const result = await PaymentService.createPayment(event);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Webhook req send successfully',
        data: result,
    });
});

export const PaymentController = {
createPayment
};