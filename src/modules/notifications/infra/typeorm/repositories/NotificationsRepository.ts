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
      const {room} = data;
      const notificationInstance = this.ormRepository.create(data);
      notificationInstance.room = room;
      const notification = await this.ormRepository.save(notificationInstance);

      return notification;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findNotificationsByUser(id_user: string): Promise<Notification[]> {
    try{
      const notifications = await this.ormRepository.find({
        where: {
          'room.user_id': { $eq: id_user }
        }
      });

      return notifications;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default NotificationsRepository;