import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import INotValidSaleDTO from '@modules/sales/dtos/INotValidSaleDTO';

class NotValidSaleService {
  constructor(private salesRepository: ISaleRepository) {}

  public async execute( 
    data: INotValidSaleDTO
  ): Promise<void> {
    const {id} = data;
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError('Sale not exists.');
    }
    
    await this.salesRepository.notValidSale(data);
  }
}

export default NotValidSaleService;
