import { Router } from "express";

import { doctorRoutes } from "./doctor.routes";
import { specialtyRoutes } from "./specialty.routes";

const router = Router();
router.use("/doctor", doctorRoutes);
router.use("/specialty", specialtyRoutes);
export { router };
