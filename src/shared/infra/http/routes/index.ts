import { Router } from "express";

import { doctorRoutes } from "./doctor.routes";

const router = Router();
router.use("/doctor", doctorRoutes);
export { router };
