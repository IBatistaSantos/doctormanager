import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleleDoctorUseCase } from "./DeleteDoctorUseCase";

class DeleteDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteDoctorUseCase = container.resolve(DeleleDoctorUseCase);
    await deleteDoctorUseCase.execute(id);
    return response.status(200).send();
  }
}

export { DeleteDoctorController };
