import { Router } from "express";

import { CreateDoctorController } from "@modules/doctor/useCases/createDoctor/CreateDoctorController";
import { DeleteDoctorController } from "@modules/doctor/useCases/deleteDoctor/DeleteDoctorController";

const doctorRoutes = Router();
const createDoctorController = new CreateDoctorController();
const deleteDoctorController = new DeleteDoctorController();
doctorRoutes.post("/", createDoctorController.handle);
doctorRoutes.delete("/:id", deleteDoctorController.handle);

export { doctorRoutes };
