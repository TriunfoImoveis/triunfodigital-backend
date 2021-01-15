import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import RankingService from '@modules/users/services/RankingService';


class RankingController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      type,
      city,
      user,
    } = request.query;
    if (typeof type !== "string") {
      throw new AppError("Tipo não é uma string válida.");
    } else if (typeof city !== "string") {
      throw new AppError("Cidade não é uma string válida.");
    } else if (typeof user !== "string") {
      throw new AppError("Tipo de Usuário não é uma string válida.");
    }

    const rankingService = container.resolve(RankingService);
    const ranking = await rankingService.execute({
      type,
      city,
      user,
    });

    return response.json(ranking);
  }
}

export default RankingController;
