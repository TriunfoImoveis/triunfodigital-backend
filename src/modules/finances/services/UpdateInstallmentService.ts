import { inject, injectable } from "tsyringe";

import IInstallmentRepository from "@modules/finances/repositories/IInstallmentRepository";
import AppError from "@shared/errors/AppError";
import { StatusInstallment } from "@modules/finances/infra/typeorm/entities/Installment";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import { Status } from "@modules/sales/infra/typeorm/entities/Sale";

@injectable()
class UpdateInstallmentService {
  constructor( 
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute(id_installment: string): Promise<void> {
    const checkInstallmentExists = await this.installmentsRepository.findById(id_installment);
    if (!checkInstallmentExists) {
      throw new AppError("Parcela não existe.", 404);
    } else if (
      (checkInstallmentExists.status !== StatusInstallment.PEN) && 
      (checkInstallmentExists.status !== StatusInstallment.VEN)
    ) {
      throw new AppError("Parcela Paga, Liquidada ou Caiu não pode ser validada.", 400);
    }
    
    const current_date = new Date();
    await this.installmentsRepository.update(
      checkInstallmentExists.id, 
      {
        pay_date: current_date, 
        status: StatusInstallment.PAG,
      }
    );

    // Verificar se a venda foi totalmente paga.
    const {id} = checkInstallmentExists.sale;
    const sale = await this.salesRepository.findById(id);
    if (sale) { 
      if (sale.status === Status.PE) {
        const fullPayment = sale.installments.every((installment) => {
          // retorna true se todas as parcelas estão com status PAGO ou LIQUIDADA.
          return (installment.status === StatusInstallment.PAG) || (installment.status === StatusInstallment.LIQ);
        });

        if (fullPayment) {
          await this.salesRepository.validSale(sale.id, Status.PT);
        }
      }
    }
  }
}

export default UpdateInstallmentService;