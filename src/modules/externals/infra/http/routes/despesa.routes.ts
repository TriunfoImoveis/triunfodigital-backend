import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import validatorFields from '@shared/infra/http/validators/validatorFields';
import DespesaController from '@modules/externals/infra/http/controllers/DespesaController';

const despesaRouter = Router();
const despesaController = new DespesaController();

despesaRouter.use(ensuredAuthenticated);

despesaRouter.get('/', despesaController.index);

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

// officeRouter.put(
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
//     officeController.update,
// );

// officeRouter.delete(
//     '/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//         id: Joi.string().uuid(),
//         },
//     }),
//     officeController.delete,
// );

export default despesaRouter;
