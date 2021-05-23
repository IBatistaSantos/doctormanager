import { Router } from "express";

import { CreateDoctorController } from "@modules/doctor/useCases/createDoctor/CreateDoctorController";

const doctorRoutes = Router();
const createDoctorController = new CreateDoctorController();
doctorRoutes.post("/", createDoctorController.handle);

export { doctorRoutes };
