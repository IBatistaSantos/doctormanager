import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListDoctorAvailableUseCase } from "./ListDoctorAvailableUseCase";

class ListDoctorAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, city, uf, crm, specialties } = request.query;

    const listDoctorAvailableUseCase = container.resolve(
      ListDoctorAvailableUseCase
    );
    const listDoctorAvailable = await listDoctorAvailableUseCase.execute({
      name: name as string,
      city: city as string,
      uf: uf as string,
      crm: crm as string,
      specialties: specialties as string[],
    });
    return response.status(200).json(listDoctorAvailable);
  }
}

export { ListDoctorAvailableController };
