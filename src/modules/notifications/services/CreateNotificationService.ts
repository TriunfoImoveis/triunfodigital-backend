import { inject, injectable } from "tsyringe";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";
import Room from "../infra/typeorm/schemas/Room";

interface IRequest {
  content: string;
  sale_id: string;
  type: 'CREATE' | 'NOTIFICATION' | 'VALIDATION';
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({
    sale_id,
    type,
    content
  }: IRequest): Promise<void> {
    const sale = await this.salesRepository.findById(sale_id);
    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    }

    var users: User[] = [];
    if ((type === 'CREATE') || (type === 'NOTIFICATION')) {
      users = await this.usersRepository.findUsers({
        office: 'Administrador',
      });
    } else if (type === 'VALIDATION') {
      users = sale.sale_has_sellers;
    }

    var room: Room[] = [];
    users.forEach((user) => {
      room.push({
        user_id: user.id,
        read: false,
      });
    });

    await this.notificationsRepository.create({
      content,
      sale_id: sale.id,
      room,
    });
  }
}

export default CreateNotificationService;
