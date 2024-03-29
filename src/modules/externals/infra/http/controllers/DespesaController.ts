import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDespesaService from '@modules/externals/services/CreateDespesaService';
import ListDespesaService from '@modules/externals/services/ListDespesaService';
import ShowDespesaService from '@modules/externals/services/ShowDespesaService';
import DeleteDespesaService from '@modules/externals/services/DeleteDespesaService';
import UpdateDespesaService from '@modules/externals/services/UpdateDespesaService';
import ExportDespesaService from '@modules/externals/services/ExportDespesaService';

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
        const { ids } = request.query;

        const deleteDespesaService = container.resolve(DeleteDespesaService);
        await deleteDespesaService.execute(ids as string);

        return response.status(204).send();
    }

    async exportExcel(request: Request, response: Response): Promise<Response> {
        const { start_date, end_date } = request.query;
    
        const exportSaleService = container.resolve(ExportDespesaService);
        const link_url = await exportSaleService.execute({
            start_date: start_date as string,
            end_date: end_date as string
        });
    
        return response.status(201).json(link_url);
    }
}

export default DespesaController;
