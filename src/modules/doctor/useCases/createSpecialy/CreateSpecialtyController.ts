import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecialtyUseCase } from "./CreateSpecialtyUseCase";

class CreateSpecialtyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createSpecialyUseCase = container.resolve(CreateSpecialtyUseCase);

    const specialty = await createSpecialyUseCase.execute({ name });
    return response.status(201).json(specialty);
  }
}

export { CreateSpecialtyController };
