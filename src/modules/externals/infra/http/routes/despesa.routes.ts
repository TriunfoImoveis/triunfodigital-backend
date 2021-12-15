import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import validatorFields from '@shared/infra/http/validators/validatorFields';
import DespesaController from '@modules/externals/infra/http/controllers/DespesaController';
import { endOfYesterday, startOfYesterday } from 'date-fns';

const despesaRouter = Router();
const despesaController = new DespesaController();

// despesaRouter.use(ensuredAuthenticated);

const CURRENT_DATE = new Date()

despesaRouter.get(
    '/', 
    celebrate({
    [Segments.QUERY]: {
        escritorio: Joi.string().uuid().default('%')
            .messages(validatorFields({name: "Escritorio"})),
        conta: Joi.string().uuid().default('%')
            .messages(validatorFields({name: "'Conta'"})),
        data_inicio: Joi.date().iso().default(new Date(2021, 1, 1))
            .messages(validatorFields({name: "'data inicio'"})),
        data_fim: Joi.date().iso().default(CURRENT_DATE)
            .greater(Joi.ref('data_inicio'))
            .messages(validatorFields({name: "'data fim'"})),
    },
}), despesaController.index);

despesaRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            tipo_despesa: Joi.string().valid(
                    "ENTRADA",
                    "SAIDA",
                ).required().messages(validatorFields({
                    name: "Tipo de Despesa", 
                    ref: "[ENTRADA ou SAIDA]"
                })),
            grupo: Joi.string().uuid().required().messages(validatorFields({
                name: "Grupo"
            })),
            descricao: Joi.string().required().messages(validatorFields({
                name: "Descrição"
            })),
            valor: Joi.number().positive().required().messages(validatorFields({
                name: "'Valor'"
            })),
            data_pagamento: Joi.date().iso().required().messages(validatorFields({
                name: "'Data do Pagamento'"
            })),
            escritorio: Joi.string().uuid().required().messages(validatorFields({
                name: "Escritorio"
            })),
            conta: Joi.string().uuid().required().messages(validatorFields({
                name: "'Conta'"
            })),
        },
    }),
    despesaController.create,
);

despesaRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    despesaController.show,
);

despesaRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
        [Segments.BODY]: {
            grupo: Joi.string().uuid().messages(validatorFields({
                name: "Grupo"
            })),
            descricao: Joi.string().messages(validatorFields({
                name: "Descrição"
            })),
            valor: Joi.number().positive().messages(validatorFields({
                name: "'Valor'"
            })),
            data_pagamento: Joi.date().iso().messages(validatorFields({
                name: "'Data do Pagamento'"
            })),
        },
    }),
    despesaController.update,
);

despesaRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    despesaController.delete,
);

despesaRouter.get('/export/excel', despesaController.exportExcel);

export default despesaRouter;
