import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListSaldoService from '@modules/externals/services/ListSaldoService';

class SaldoController {
    async index(request: Request, response: Response): Promise<Response> {
        const listSaldoService = container.resolve(ListSaldoService);

        const saldos = await listSaldoService.execute();

        return response.json(saldos);
    }
}

export default SaldoController;
