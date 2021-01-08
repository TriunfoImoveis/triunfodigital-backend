import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import AppError from "@shared/errors/AppError";
import ICreateInstallmentDTO from "@modules/sales/dtos/ICreateInstallmentDTO";
import IInstallmentRepository from "@modules/sales/repositories/IInstallmentRepository";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import Installment from "@modules/sales/infra/typeorm/entities/Installment";
import { Status } from "@modules/sales/infra/typeorm/entities/Sale";

interface IRequestDTO {
  id: string;
  installments: ICreateInstallmentDTO[];
}

@injectable()
class CreateInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({id, installments}: IRequestDTO): Promise<Installment[]> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Venda já validada.", 400);
    }
    // Add a venda em cada parcela e somar o total das parcelas.
    var totalValueInstallments = 0;
    installments.map(
      (installment) => {
        installment.due_date = add(
          installment.due_date, 
          {hours: 3}
        )
        installment.sale = sale;
        totalValueInstallments += Number(installment.value);
      }
    );
    // Comparar o total das parcelas com o valor da comissão.
    if (totalValueInstallments !== Number(sale.commission)) {
      throw new AppError(
        "O valor total das parcelas não confere com o valor da comissão.", 
        400
      );
    }

    if (sale.installments.length !== 0) {
      await this.installmentsRepository.delete(sale.installments);
    }

    const listInstallment = await this.installmentsRepository.create(installments);

    return listInstallment;
  }
}

export default CreateInstallmentService;