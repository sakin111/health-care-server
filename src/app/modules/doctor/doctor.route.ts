import express from "express";
import { DoctorController } from "./doctor.controller";
const router = express.Router();

router.get(
    "/allDoctors",
    DoctorController.getAllFromDB
)

router.get(
    "/suggestions",
    DoctorController.suggestions
)


router.patch(
    "doctor/:id",
    DoctorController.updateIntoDB
)
router.delete(
    "/doctor",
    DoctorController.deleteDoctor
)
export const DoctorRoutes = router;