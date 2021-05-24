import { Router } from "express";

import { CreateDoctorController } from "@modules/doctor/useCases/createDoctor/CreateDoctorController";
import { DeleteDoctorController } from "@modules/doctor/useCases/deleteDoctor/DeleteDoctorController";
import { ListDoctorAvailableController } from "@modules/doctor/useCases/listDoctorAvailable/ListDoctorAvailableController";
import { UpdateDoctorController } from "@modules/doctor/useCases/updateDoctor/UpdateDoctorController";

const doctorRoutes = Router();
const createDoctorController = new CreateDoctorController();
const updateDoctorController = new UpdateDoctorController();
const deleteDoctorController = new DeleteDoctorController();
const listDoctorAvailableController = new ListDoctorAvailableController();

doctorRoutes.post("/", createDoctorController.handle);
doctorRoutes.get("/available", listDoctorAvailableController.handle);
doctorRoutes.delete("/:id", deleteDoctorController.handle);
doctorRoutes.put("/:id", updateDoctorController.handle);

export { doctorRoutes };
