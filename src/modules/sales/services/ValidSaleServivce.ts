import { container, inject, injectable } from 'tsyringe';
import { format, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import SendEmailSaleService from './SendEmailSaleService';

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
        402
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
    
    // Envia e-mail para os corretores da venda.
    const nameSellers = sale.sale_has_sellers.map(seller => {
      return seller.name;
    });

    const dateFormated = format(parseISO(sale.sale_date.toString()), 'dd/MM/yyyy');
    
    const sendEmailSaleService = container.resolve(SendEmailSaleService);
    await sendEmailSaleService.execute({
      file: "valid_sale.hbs",
      subject: "[Triunfo Digital] Venda Validada",
      to_users: sale.sale_has_sellers,
      variables: {
        type: sale.sale_type,
        date: dateFormated,
        enterprise: sale.realty.enterprise,
        value: Number(sale.realty_ammount).toLocaleString(
          'pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }
        ),
        sellers: nameSellers,
      }
    });
  }
}

export default ValidSaleService;
