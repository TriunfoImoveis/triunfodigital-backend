import RankingService from '@modules/users/services/RankingService';
import { Request, Response } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';


class RankingController {
  async index(request: Request, response: Response): Promise<Response> {
    const { city } = request.query;

    if (typeof city !== 'string')  {
      throw new AppError('City not is valid string.');
    }

    const usersRepository = new UsersRepository;
    const rankingService = new RankingService(usersRepository);

    const ranking = await rankingService.execute({
      city,
    });

    return response.json(ranking);
  }
}

export default RankingController;
