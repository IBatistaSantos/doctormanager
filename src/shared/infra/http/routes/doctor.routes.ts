import { celebrate, Joi, Segments } from "celebrate";
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

doctorRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      CRM: Joi.string().required(),
      cep: Joi.string(),
      specialties: Joi.array().min(2).required(),
      contacts: Joi.object(),
    },
  }),
  createDoctorController.handle
);
doctorRoutes.get("/available", listDoctorAvailableController.handle);
doctorRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  deleteDoctorController.handle
);
doctorRoutes.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      CRM: Joi.string(),
      cep: Joi.string(),
      specialties: Joi.array().min(2),
      contacts: Joi.object(),
    },
  }),
  updateDoctorController.handle
);

export { doctorRoutes };
