import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { authRouter } from '../modules/auth/auth.route';
import { scheduleRouter } from '../modules/schedules/schedules.route';
import { DoctorSchedule } from '../modules/doctorSchedule/doctorSchedule.route';
import { SpecialitiesRoutes } from '../modules/specialities/specialities.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/schedule',
        route: scheduleRouter
    },
    {
        path: '/doctorSchedule',
        route: DoctorSchedule
    },
    {
        path: '/specialities',
        route: SpecialitiesRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;