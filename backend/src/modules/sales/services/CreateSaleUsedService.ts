import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleDTO from "@modules/sales/dtos/ICreateSaleDTO";

class CreateSaleUsedService {
  constructor(private saleRepository: ISaleRepository) {}

  public async execute({

  }: ICreateSaleDTO): Promise<void> {

  }
}

export default CreateSaleUsedService;
