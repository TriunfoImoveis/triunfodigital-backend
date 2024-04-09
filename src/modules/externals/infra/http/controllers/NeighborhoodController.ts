import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNeighborhoodService from '@modules/externals/services/CreateNeighborhoodService';
import IRequestNeighborhoodDTO from '@modules/externals/dtos/IRequestNeighborhoodDTO';
import ListNeighborhoodService from '@modules/externals/services/ListNeighborhoodService';
import ShowNeighborhoodService from '@modules/externals/services/ShowNeighborhoodService';
import UpdateNeighborhoodService from '@modules/externals/services/UpdateNeighborhoodService';
import DeleteNeighborhoodService from '@modules/externals/services/DeleteNeighborhoodService';

interface IRequestParams {
  id: string;
}
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
  async show(request: Request<IRequestParams, never, never, never>, response: Response): Promise<Response> {
    const { id } = request.params
    const showNeighborhood = container.resolve(ShowNeighborhoodService);
    const neighborhood = await showNeighborhood.execute(id);

    return response.status(200).json(neighborhood);
  }
  async update(request: Request<IRequestParams, never, never, IRequestNeighborhoodDTO>, response: Response): Promise<Response> {
    const { id } = request.params

    const data = request.body
    const updateNeighborhoodService = container.resolve(UpdateNeighborhoodService);
    await updateNeighborhoodService.execute(id, data);

    return response.status(204).send();
  }
  async delete(request: Request<IRequestParams, never, never, never>, response: Response): Promise<Response> {
    const { id } = request.query
    const deleteNeighborhoodService = container.resolve(DeleteNeighborhoodService);
    await deleteNeighborhoodService.execute(id);

    return response.status(204).send();
  }

  async active(request: Request<IRequestParams, never, never, never>, response: Response): Promise<Response> {
    const { id } = request.params
    const updateNeighborhoodService = container.resolve(UpdateNeighborhoodService);
    await updateNeighborhoodService.execute(id, { active: true });

    return response.status(204).send();
  }
}

export default NeighborhoodController;
