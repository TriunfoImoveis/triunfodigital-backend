import { container, inject, injectable } from 'tsyringe';
import { format, parseISO } from 'date-fns';
import path from 'path';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import INotValidSaleDTO from '@modules/sales/dtos/INotValidSaleDTO';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import mailQueue from "@shared/container/providers/JobProvider/implementations/Queue";

@injectable()
class NotValidSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,

    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(data: INotValidSaleDTO): Promise<void> {
    const {id} = data;
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if ((sale.status !== Status.NV) && (sale.status !== Status.PE)) {
      throw new AppError("Venda já validada.", 400);
    }

    if (sale.installments.length !== 0) {
      sale.installments.forEach(async (installment)=>{
        if (
          (installment.status === StatusInstallment.PEN) || 
          (installment.status === StatusInstallment.VEN)
        ) {
          await this.installmentsRepository.update(
            installment.id, 
            {
              status: StatusInstallment.CAI
            }
          );
        }
      });
    }
    
    await this.salesRepository.notValidSale(data);

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
    //     'not_valid_sale.hbs'
    //   );

      // Envia e-mail para os corretores da venda.
      // const nameSellers = sale.sale_has_sellers.map(seller => {
      //   return seller.name;
      // });

      // const dateFormated = format(parseISO(sale.sale_date.toString()), 'dd/MM/yyyy');
    
      // Adicionar job ValidSaleJob na fila
    //   await mailQueue.add('ValidationSaleJob', {
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
    //     }
    //   });
    // }
  }
}

export default NotValidSaleService;
