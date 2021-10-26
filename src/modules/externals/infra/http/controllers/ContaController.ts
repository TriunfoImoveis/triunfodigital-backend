import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListContaService from '@modules/externals/services/ListContaService';

class ContaController {
    async index(request: Request, response: Response): Promise<Response> {
        const listContaService = container.resolve(ListContaService);

        const contas = await listContaService.execute();

        return response.json(contas);
    }
}

export default ContaController;
