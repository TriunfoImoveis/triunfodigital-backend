import { inject, injectable } from "tsyringe";

import ICalculatorRepository from "@modules/finances/repositories/ICalculatorRepository";
import ICreateCalculatorDTO from "@modules/finances/dtos/ICreateCalculatorDTO";
import IInstallmentRepository from "@modules/finances/repositories/IInstallmentRepository";
import AppError from "@shared/errors/AppError";
import IDivisionRepository from "@modules/finances/repositories/IDivisionRepository";
import Calculator from "@modules/finances/infra/typeorm/entities/Calculator";
import { StatusInstallment } from "@modules/finances/infra/typeorm/entities/Installment";
import { string } from "yup";

@injectable()
class CreateCalculationService {
  constructor(
    @inject('CalculatorRepository')
    private calculatorRepository: ICalculatorRepository,

    @inject('DivisionRepository')
    private divisionRepository: IDivisionRepository,

    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(data: ICreateCalculatorDTO): Promise<Calculator> {
    const {installment} = data;

    const installmentExists = await this.installmentsRepository.findById(installment);
    if (!installmentExists) {
      throw new AppError("Parcela não existe.", 404);
    } else if (installmentExists.calculation) {
      throw new AppError("Parcela já calculada.", 400);
    }

    data.division_pl = await this.divisionRepository.create(data.division_pl);
    data.division_lucro = await this.divisionRepository.create(data.division_lucro);
    data.division_tax = await this.divisionRepository.create(data.division_tax);
    if (data.division_other_one) 
      data.division_other_one = await this.divisionRepository.create(data.division_other_one);
    if (data.division_other_two)
      data.division_other_two = await this.divisionRepository.create(data.division_other_two);
    if (data.division_other_three)
      data.division_other_three = await this.divisionRepository.create(data.division_other_three);

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