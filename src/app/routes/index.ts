import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { authRouter } from '../modules/auth/auth.route';
import { scheduleRouter } from '../modules/schedules/schedules.route';
import { DoctorSchedule } from '../modules/doctorSchedule/doctorSchedule.route';
import { SpecialitiesRoutes } from '../modules/specialities/specialities.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { PrescriptionRoutes } from '../modules/prescription/prescription.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { PatientRoutes } from '../modules/patient/patient.route';


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
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
    {
        path: '/doctorSchedule',
        route: DoctorSchedule
    },
    {
        path: '/specialities',
        route: SpecialitiesRoutes
    },
    // {
    //     path: '/payment',
    //     route: paymentRoutes
    // },
    {
        path: '/review',
        route: ReviewRoutes
    },
    {
        path: '/prescription',
        route: PrescriptionRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;