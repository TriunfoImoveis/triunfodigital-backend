import { Request, Response } from "express";
import { container } from "tsyringe";

import ListNotificationService from "@modules/notifications/services/ListNotificationService";

class NotificationController {
  async list(request: Request, response: Response): Promise<Response> {
    
    const listNotificationService = container.resolve(ListNotificationService);
    const notifications = await listNotificationService.execute(
      request.user.id,
    );

    return response.json(notifications);
  }
}

export default NotificationController;