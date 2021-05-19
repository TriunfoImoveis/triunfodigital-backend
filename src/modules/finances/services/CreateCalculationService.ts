import { inject, injectable } from "tsyringe";

import ICalculatorRepository from "@modules/finances/repositories/ICalculatorRepository";
import ICreateCalculatorDTO from "@modules/finances/dtos/ICreateCalculatorDTO";
import IInstallmentRepository from "@modules/finances/repositories/IInstallmentRepository";
import AppError from "@shared/errors/AppError";
import Calculator from "@modules/finances/infra/typeorm/entities/Calculator";
import { StatusInstallment } from "@modules/finances/infra/typeorm/entities/Installment";

@injectable()
class CreateCalculationService {
  constructor(
    @inject('CalculatorRepository')
    private calculatorRepository: ICalculatorRepository,

    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(data: ICreateCalculatorDTO): Promise<Calculator> {
    const {installment} = data;
    
    const installmentExists = await this.installmentsRepository.findById(String(installment));
    if (!installmentExists) {
      throw new AppError("Parcela não existe.", 404);
    } else if (installmentExists.calculation) {
      throw new AppError("Parcela já calculada.", 400);
    }
    
    const calculation = await this.calculatorRepository.create(data);

    await this.installmentsRepository.update(
      installmentExists.id,
      {
        pay_date: new Date(),
        status: StatusInstallment.PAG,
      }
    );

    return calculation;
  }
}

export default CreateCalculationService;