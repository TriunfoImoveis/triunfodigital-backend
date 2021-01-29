import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import INotValidSaleDTO from '@modules/sales/dtos/INotValidSaleDTO';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import { StatusInstallment } from '@modules/sales/infra/typeorm/entities/Installment';
import IInstallmentRepository from '@modules/sales/repositories/IInstallmentRepository';

@injectable()
class NotValidSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,

    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute( 
    data: INotValidSaleDTO
  ): Promise<void> {
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
  }
}

export default NotValidSaleService;
