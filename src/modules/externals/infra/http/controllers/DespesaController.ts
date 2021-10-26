import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDespesaService from '@modules/externals/services/CreateDespesaService';
import ListDespesaService from '@modules/externals/services/ListDespesaService';
import ShowDespesaService from '@modules/externals/services/ShowDespesaService';
import DeleteDespesaService from '@modules/externals/services/DeleteDespesaService';

class DespesaController {
    async index(request: Request, response: Response): Promise<Response> {
        const listDespesaService = container.resolve(ListDespesaService);

        const despesas = await listDespesaService.execute();

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
            descricao,
            valor,
            escritorio,
            conta,
        } = request.body;

        const createDespesaService = container.resolve(CreateDespesaService);

        const newOffice = await createDespesaService.execute({
        tipo_despesa,
        descricao,
        valor,
        escritorio,
        conta,
        });

        return response.json(newOffice);
    }

//   async update(request: Request, response: Response): Promise<Response> {
//     const updateOfficeService = container.resolve(UpdateOfficeService);
    
//     const updatedOffice = await updateOfficeService.execute({
//       id: request.params.id,
//       body: request.body,
//     });

//     return response.json(updatedOffice);
//   }

    async delete(request: Request, response: Response): Promise<Response> {
        const deleteDespesaService = container.resolve(DeleteDespesaService);

        await deleteDespesaService.execute(request.params.id);

        return response.status(204).send();
    }
}

export default DespesaController;
