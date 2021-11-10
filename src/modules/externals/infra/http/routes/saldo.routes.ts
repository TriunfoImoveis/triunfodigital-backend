import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SaldoController from '@modules/externals/infra/http/controllers/SaldoController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const saldoRouter = Router();
const saldoController = new SaldoController();

saldoRouter.get(
    '/', 
    celebrate({
    [Segments.QUERY]: {
        escritorio: Joi.string().default('').messages(validatorFields({
            name: "Escritorio"
        })),
        conta: Joi.string().default('').messages(validatorFields({
            name: "'Conta'"
        })),
    },
}), saldoController.index);

export default saldoRouter;
