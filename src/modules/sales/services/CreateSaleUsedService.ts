import { add } from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import AppError from "@shared/errors/AppError";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import ICreateInstallmentDTO from "@modules/sales/dtos/ICreateInstallmentDTO";

class CreateSaleUsedService {
  constructor(private saleRepository: ISaleRepository) {}

  public async execute({
    sale_type,
    sale_date,
    realty_ammount,
    percentage_sale,
    commission,
    bonus,
    origin,
    payment_type,
    realty,
    client_buyer,
    client_seller,
    user_coordinator,
    users_captivators,
    users_directors,
    users_sellers,
  }: ICreateSaleUsedDTO, installment: ICreateInstallmentDTO): Promise<Sale> {
    var usersRepository = new UsersRepository();

    if (user_coordinator) {
      const coordinatorExists = await usersRepository.findById(String(user_coordinator));
      if (!coordinatorExists) {
        throw new AppError("Usuário coordenador não existe.");
      } else if (coordinatorExists.office.name !== "Coordenador") {
        throw new AppError("Usuário não é coordenador.");
      }
    }

    if (installment.value > commission) {
      throw new AppError("Valor da parcela não pode ser maior que a comissão.", 400);
    }

    const ajusted_date = add(sale_date, {hours: 3});
    installment.due_date = add(sale_date, {hours: 3});

    const sale = await this.saleRepository.createSaleUsed({
      sale_type,
      sale_date: ajusted_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty,
      client_buyer,
      client_seller,
      user_coordinator,
      users_directors,
      users_captivators,
      users_sellers,
    }, installment);

    if (!sale) {
      throw new AppError(
        "Erro durante a criação da venda, ckeck seus dados e tente novamente.",
        400
      );
    }

    return sale;
  }
}

export default CreateSaleUsedService;
