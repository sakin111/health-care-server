import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post(
    "/payments",
    auth(UserRole.PATIENT),
    PaymentController.createPayment
)

export const paymentRoutes = router;