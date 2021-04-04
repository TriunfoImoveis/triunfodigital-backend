import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import RankingService from '@modules/users/services/RankingService';


class RankingController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      type,
      month,
      city,
      user,
    } = request.query;

    const rankingService = container.resolve(RankingService);
    const ranking = await rankingService.execute({
      type: type as string,
      month: Number(month),
      city: city as string,
      user: user as string,
    });

    return response.json(ranking);
  }
}

export default RankingController;
