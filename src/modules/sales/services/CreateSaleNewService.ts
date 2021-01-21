import { add } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';

class CreateSaleNewService {
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
    builder,
    client_buyer,
    user_coordinator,
    users_directors,
    users_sellers,
    value_signal,
    pay_date_signal,
  }: ICreateSaleNewDTO, installment: ICreateInstallmentDTO): Promise<Sale> {
    // var usersRepository = new UsersRepository();
    
    // if (user_coordinator) {
    //   const coordinatorExists = await usersRepository.findById(String(user_coordinator));
    //   if (!coordinatorExists) {
    //     throw new AppError("Usuário coordenador não existe.");
    //   } else if (coordinatorExists.office.name !== "Coordenador") {
    //     throw new AppError("Usuário não é coordenador.");
    //   }
    // }

    if (installment.value > commission) {
      throw new AppError("Valor da parcela não pode ser maior que a comissão.", 400);
    }

    const ajusted_date = add(sale_date, {hours: 3});
    const ajusted_date_signal = add(pay_date_signal, {hours: 3});
    installment.due_date = add(installment.due_date, {hours: 3});

    const sale = await this.saleRepository.createSaleNew({
      sale_type,
      sale_date: ajusted_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty,
      builder,
      client_buyer,
      user_coordinator,
      users_directors,
      users_sellers,
      value_signal,
      pay_date_signal: ajusted_date_signal,
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

export default CreateSaleNewService;
