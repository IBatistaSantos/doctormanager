import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

class CreateDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, CRM, cep, specialties, contact } = request.body;

    const createCarUseCase = container.resolve(CreateDoctorUseCase);

    const doctor = await createCarUseCase.execute({
      name,
      CRM,
      cep,
      specialties,
      contact,
    });

    return response.status(201).json(doctor);
  }
}

export { CreateDoctorController };
