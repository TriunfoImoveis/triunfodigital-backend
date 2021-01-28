import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import { StatusInstallment } from '@modules/sales/infra/typeorm/entities/Installment';

@injectable()
class ValidSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const sale = await this.salesRepository.findById(id);
    
    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Venda já validada.", 400);
    } else if (!sale.payment_signal) {
      throw new AppError(
        "Confirme o pagamento do Sinal (ATO) antes de validar a venda.", 
        400
      );
    } else if (!sale.installments.length) {
      throw new AppError(
        "Venda não contem parcelas, adicione parcelas antes de validar.", 
        400
      );
    } else {
      var totalValueInstallments = 0;
      sale.installments.forEach((installment)=>{
        totalValueInstallments += Number(installment.value);
      });

      // Comparar o total das parcelas com o valor da comissão.
      if (totalValueInstallments !== Number(sale.commission)) {
        throw new AppError(
          "O valor total das parcelas não confere com o valor da comissão.", 
          400
        );
      }
    }

    // Define o status da venda conforme a quantidade de parcelas.
    if (sale.installments.length === 1) {
      var status = Status.PT;
    } else {
      var status = Status.PE;
    }

    await this.salesRepository.validSale(id, status);
  }
}

export default ValidSaleService;
