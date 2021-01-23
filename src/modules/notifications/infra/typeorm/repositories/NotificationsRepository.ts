import { getMongoRepository, MongoRepository } from "typeorm";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import AppError from "@shared/errors/AppError";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  async create(data: ICreateNotificationDTO): Promise<Notification> {
    try {
      const notificationInstance = this.ormRepository.create(data);
      const notification = await this.ormRepository.save(notificationInstance);

      return notification;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default NotificationsRepository;