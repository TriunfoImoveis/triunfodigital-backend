import { inject, injectable } from "tsyringe";
import { add } from 'date-fns';

import IInstallmentRepository from "@modules/sales/repositories/IInstallmentRepository";
import AppError from "@shared/errors/AppError";
import { StatusInstallment } from "@modules/sales/infra/typeorm/entities/Installment";

@injectable()
class UpdateInstallmentService {
  constructor( 
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkInstallmentExists = await this.installmentsRepository.findById(id);
    if (!checkInstallmentExists) {
      throw new AppError("Parcela não existe.", 404);
    } else if (checkInstallmentExists.status !== StatusInstallment.PEN) {
      throw new AppError("Parcela não está mais como Pendente.", 400);
    }
    
    const current_date = new Date();
    await this.installmentsRepository.update(
      id, 
      {
        pay_date: current_date, 
        status: StatusInstallment.PAG,
      }
    );
  }
}

export default UpdateInstallmentService;