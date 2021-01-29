import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";

@injectable()
class ListNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(id_user: string): Promise<Notification[]> {
    const userExist = await this.usersRepository.findById(id_user);
    if (!userExist) {
      throw new AppError("Usuário não existe.", 404);
    }

    const notifications = await this.notificationsRepository.findNotificationsByUser(
      userExist.id
    );

    return notifications;
  }
}

export default ListNotificationService;