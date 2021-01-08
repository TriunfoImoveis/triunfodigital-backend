import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import AppError from "@shared/errors/AppError";
import ICreateInstallmentDTO from "@modules/sales/dtos/ICreateInstallmentDTO";
import IInstallmentRepository from "@modules/sales/repositories/IInstallmentRepository";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import { Status } from "@modules/sales/infra/typeorm/entities/Sale";

interface IRequestDTO {
  id: string;
  installment: ICreateInstallmentDTO;
}

@injectable()
class CreateFirstInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({id, installment}: IRequestDTO): Promise<void> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Venda já validada.", 400);
    }

    installment.due_date = add(installment.due_date, {hours: 3});
    installment.sale = sale;

    await this.installmentsRepository.createFirstInstallment(installment);
  }
}

export default CreateFirstInstallmentService;