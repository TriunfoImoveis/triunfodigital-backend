import { inject, injectable } from 'tsyringe';
import { format, parseISO } from 'date-fns';
import path from 'path';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import mailQueue from "@shared/container/providers/JobProvider/implementations/Queue";

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
    // let listEmails: string[] = [];
    // sale.sale_has_sellers.map(user => {
    //   if (user.validated_account) {
    //     listEmails.push(user.email);
    //   }
    // });

    // Verifica se existem e-mails confirmados e faz o processo de envio dos e-mails
    // if (listEmails.length > 0) {
    //   const pathSaleTemplate = path.resolve(
    //     __dirname, 
    //     '..', 
    //     'views',
    //     'valid_sale.hbs'
    //   );

    //   const nameSellers = sale.sale_has_sellers.map(seller => {
    //     return seller.name;
    //   });

    //   const dateFormated = format(parseISO(sale.sale_date.toString()), 'dd/MM/yyyy');

      // Adicionar job ValidSaleJob na fila
      // await mailQueue.add('ValidSaleJob', 
      //   {
      //     to_users: listEmails.toString(),
      //     subject: "[Triunfo Digital] Venda Validada",
      //     file: pathSaleTemplate,
      //     variables: {
      //       type: sale.sale_type,
      //       date: dateFormated,
      //       enterprise: sale.realty.enterprise,
      //       value: Number(sale.realty_ammount).toLocaleString(
      //         'pt-BR', { 
      //           style: 'currency', 
      //           currency: 'BRL' 
      //         }
      //       ),
      //       sellers: nameSellers,
      //   }
      // });
    // }
  }
}

export default ValidSaleService;
