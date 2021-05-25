import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleleDoctorUseCase {
  constructor(
    @inject("DoctorRepository")
    private doctorRepository: IDoctorRepository
  ) {}

  async execute(doctorId: string): Promise<void> {
    const doctor = await this.doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor not found");
    }
    doctor.isActive = false;
    await this.doctorRepository.create(doctor);
  }
}

export { DeleleDoctorUseCase };
