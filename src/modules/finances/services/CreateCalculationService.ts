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
    } else if ((installmentExists.status === StatusInstallment.LIQ) || (installmentExists.status !== StatusInstallment.PAG)) {
      throw new AppError("Parcela não está com status de PAGO ou já foi LIQUIDADA.", 400);
    }
    
    const calculation = await this.calculatorRepository.create(data);

    await this.installmentsRepository.update(installmentExists.id, {status: StatusInstallment.LIQ});

    return calculation;
  }
}

export default CreateCalculationService;