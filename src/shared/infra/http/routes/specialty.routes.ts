import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { CreateSpecialtyController } from "@modules/doctor/useCases/createSpecialy/CreateSpecialtyController";

const specialtyRoutes = Router();
const createSpecialtyController = new CreateSpecialtyController();
specialtyRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  createSpecialtyController.handle
);

export { specialtyRoutes };
