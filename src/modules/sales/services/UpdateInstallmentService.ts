import { inject, injectable } from "tsyringe";
import { add } from 'date-fns';

import IInstallmentRepository from "@modules/sales/repositories/IInstallmentRepository";
import AppError from "@shared/errors/AppError";
import { StatusInstallment } from "@modules/sales/infra/typeorm/entities/Installment";

interface IRequestDTO {
  id: string;
  pay_date: Date;
}

@injectable()
class UpdateInstallmentService {
  constructor( 
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute({id, pay_date}: IRequestDTO): Promise<void> {
    const checkInstallmentExists = await this.installmentsRepository.findById(id);
    if (!checkInstallmentExists) {
      throw new AppError("Parcela não existe.", 404);
    }
    
    await this.installmentsRepository.update(
      id, 
      {
        pay_date: add(pay_date, {hours: 3}), 
        status: StatusInstallment.PAG,
      }
    );
  }
}

export default UpdateInstallmentService;