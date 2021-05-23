import { Router } from "express";

import { CreateSpecialtyController } from "@modules/doctor/useCases/createSpecialy/CreateSpecialtyController";

const specialtyRoutes = Router();
const createSpecialtyController = new CreateSpecialtyController();
specialtyRoutes.post("/", createSpecialtyController.handle);

export { specialtyRoutes };
