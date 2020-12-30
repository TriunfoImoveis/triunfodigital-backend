import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import INotValidSaleDTO from '@modules/sales/dtos/INotValidSaleDTO';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';

class NotValidSaleService {
  constructor(private salesRepository: ISaleRepository) {}

  public async execute( 
    data: INotValidSaleDTO
  ): Promise<void> {
    const {id} = data;
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Sale not exists.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Sale already validated.", 400);
    }
    
    await this.salesRepository.notValidSale(data);
  }
}

export default NotValidSaleService;
