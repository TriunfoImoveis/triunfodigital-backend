import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import { StatusInstallment } from '@modules/sales/infra/typeorm/entities/Installment';

class ValidSaleService {
  constructor(
    private salesRepository: ISaleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const sale = await this.salesRepository.findById(id);
    
    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Venda já validada.", 400);
    } else if (!sale.installments.length) {
      throw new AppError(
        "Venda não contem parcelas, adicione parcelas antes de validar.", 
        400
      );
    } else {
      var totalValueInstallments = 0;
      sale.installments.forEach((installment)=>{
        totalValueInstallments += Number(installment.value);

        // Verificar se a primeira parcela está com o status de PAGO.
        // if (installment.installment_number === 1 && installment.status !== StatusInstallment.PAG) {
        //   throw new AppError(
        //     "Antes de validar é necessário confirmar o pagamento da primeira parcela.", 
        //     400
        //   );
        // }
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
