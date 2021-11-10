import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListSaldoService from '@modules/externals/services/ListSaldoService';

class SaldoController {
    async index(request: Request, response: Response): Promise<Response> {
        const { 
            escritorio,
            conta,
        } = request.query;

        const listSaldoService = container.resolve(ListSaldoService);
        const saldos = await listSaldoService.execute({
            escritorio: escritorio as string,
            conta: conta as string,
        });

        return response.json(saldos);
    }
}

export default SaldoController;
