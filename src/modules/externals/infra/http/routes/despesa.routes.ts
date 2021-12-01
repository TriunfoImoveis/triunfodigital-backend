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
const START_YESTERDAY = startOfYesterday()
const END_YESTERDAY = endOfYesterday()

despesaRouter.get(
    '/', 
    celebrate({
    [Segments.QUERY]: {
        escritorio: Joi.string().uuid().default('%')
            .messages(validatorFields({name: "Escritorio"})),
        conta: Joi.string().uuid().default('%')
            .messages(validatorFields({name: "'Conta'"})),
        data_inicio: Joi.date().iso().default(START_YESTERDAY)
            .messages(validatorFields({name: "'data inicio'"})),
        data_fim: Joi.date().iso().default(END_YESTERDAY)
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

// despesaRouter.put(
//     '/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//         id: Joi.string().uuid(),
//         },
//         [Segments.BODY]: {
//         name: Joi.string().messages(validatorFields({name: "'nome'"})),
//         active: Joi.boolean().messages(validatorFields({name: "'ativo'"})),
//         },
//     }),
//     despesaController.update,
// );

despesaRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    despesaController.delete,
);

export default despesaRouter;
