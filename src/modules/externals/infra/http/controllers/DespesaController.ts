import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDespesaService from '@modules/externals/services/CreateDespesaService';
import ListDespesaService from '@modules/externals/services/ListDespesaService';
import ShowDespesaService from '@modules/externals/services/ShowDespesaService';
import DeleteDespesaService from '@modules/externals/services/DeleteDespesaService';
import UpdateDespesaService from '@modules/externals/services/UpdateDespesaService';

class DespesaController {
    async index(request: Request, response: Response): Promise<Response> {
        const { 
            escritorio,
            conta,
            data_inicio,
            data_fim,
        } = request.query;

        const listDespesaService = container.resolve(ListDespesaService);

        const despesas = await listDespesaService.execute({
            escritorio: escritorio as string,
            conta: conta as string,
            data_inicio: data_inicio as string,
            data_fim: data_fim as string,
        });

        return response.json(despesas);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const showDespesaService = container.resolve(ShowDespesaService);

        const despesa = await showDespesaService.execute(
        request.params.id
        );

        return response.json(despesa);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { 
            tipo_despesa,
            grupo,
            descricao,
            valor,
            data_pagamento,
            escritorio,
            conta,
        } = request.body;

        const createDespesaService = container.resolve(CreateDespesaService);

        const newOffice = await createDespesaService.execute({
            tipo_despesa,
            grupo,
            descricao,
            valor,
            data_pagamento,
            escritorio,
            conta,
        });

        return response.json(newOffice);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const data = request.body;

        const updateDespesaService = container.resolve(UpdateDespesaService);
        
        await updateDespesaService.execute(id, data);

        return response.status(204).send();
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const deleteDespesaService = container.resolve(DeleteDespesaService);

        await deleteDespesaService.execute(request.params.id);

        return response.status(204).send();
    }
}

export default DespesaController;
