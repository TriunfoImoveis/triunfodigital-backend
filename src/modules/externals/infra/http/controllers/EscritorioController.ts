import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListEscritorioService from '@modules/externals/services/ListEscritorioService';

class EscritorioController {
    async index(request: Request, response: Response): Promise<Response> {
        const listEscritorioService = container.resolve(ListEscritorioService);

        const escritorios = await listEscritorioService.execute();

        return response.json(escritorios);
    }
}

export default EscritorioController;
