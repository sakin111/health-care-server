import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './config';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import { PaymentController } from './app/modules/payment/payment.controller';



const app: Application = express();


app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    PaymentController.createPayment
);
app.use(cors());

//parser
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)


app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "health care server..",
        environment: config.node_env,
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString()
    })
});


app.use(notFound);

app.use(globalErrorHandler);
export default app;