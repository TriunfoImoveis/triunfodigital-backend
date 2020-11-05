import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import RankingService from '@modules/users/services/RankingService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';


class RankingController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      city,
      month,
      year,
    } = request.query;

    if (typeof city !== "string") {
      throw new AppError("City not is valid string.");
    }

    const usersRepository = new UsersRepository;
    const salesRepository = new SaleRepository;
    const rankingService = new RankingService(
      usersRepository,
      salesRepository
    );

    const ranking = await rankingService.execute({
      city,
      month: Number(month),
      year: Number(year),
    });

    return response.json(ranking);
  }
}

export default RankingController;
