import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateDoctorUseCase } from "./UpdateDoctorUseCase";

class UpdateDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, CRM, cep, specialties, contact, isActive } = request.body;

    const updateCarUseCase = container.resolve(UpdateDoctorUseCase);

    const doctor = await updateCarUseCase.execute({
      id,
      name,
      CRM,
      cep,
      specialties,
      contact,
      isActive,
    });

    return response.status(200).json(doctor);
  }
}

export { UpdateDoctorController };
