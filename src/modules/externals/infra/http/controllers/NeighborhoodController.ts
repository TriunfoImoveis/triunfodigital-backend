import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListContaService from '@modules/externals/services/ListContaService';
import CreateNeighborhoodService from '@modules/externals/services/CreateNeighborhoodService';
import IRequestNeighborhoodDTO from '@modules/externals/dtos/IRequestNeighborhoodDTO';
import ListNeighborhoodService from '@modules/externals/services/ListNeighborhoodService';

class NeighborhoodController {
    async create(request: Request, response: Response): Promise<Response> {
       const createNewNeighborhood = container.resolve(CreateNeighborhoodService);
       await createNewNeighborhood.execute(request.body);

       return response.status(201).send();
    }
    async index(request: Request<never, never, never, IRequestNeighborhoodDTO>, response: Response): Promise<Response> {
       const listNewNeighborhood = container.resolve(ListNeighborhoodService);
       const neighborhoods = await listNewNeighborhood.execute(request.query);

       return response.status(200).json(neighborhoods);
    }
}

export default NeighborhoodController;
