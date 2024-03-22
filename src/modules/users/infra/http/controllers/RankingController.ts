import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import RankingService from '@modules/users/services/RankingService';

interface RankingQueryParams {
  year?: string;
  month?: string;
  subsidiary?: string;
  typeRanking: 'sales' | 'captivator';
  office: 'Corretor' | 'Coordenador' | 'Coordenador';
}
class RankingController {
  async index(request: Request<never, never, never, RankingQueryParams>, response: Response): Promise<Response> {
    const {
      office,
      month,
      subsidiary,
      year,
      typeRanking
    } = request.query;

    const rankingService = container.resolve(RankingService);
    const ranking = await rankingService.execute({
      year,
      month,
      subsidiary,
      office,
      typeRanking
    });

    return response.json(ranking);
  }
}

export default RankingController;
