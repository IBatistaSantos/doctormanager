import { Router } from "express";

import { CreateDoctorController } from "@modules/doctor/useCases/createDoctor/CreateDoctorController";
import { DeleteDoctorController } from "@modules/doctor/useCases/deleteDoctor/DeleteDoctorController";
import { UpdateDoctorController } from "@modules/doctor/useCases/updateDoctor/UpdateDoctorController";

const doctorRoutes = Router();
const createDoctorController = new CreateDoctorController();
const updateDoctorController = new UpdateDoctorController();
const deleteDoctorController = new DeleteDoctorController();

doctorRoutes.post("/", createDoctorController.handle);
doctorRoutes.delete("/:id", deleteDoctorController.handle);
doctorRoutes.put("/:id", updateDoctorController.handle);

export { doctorRoutes };
