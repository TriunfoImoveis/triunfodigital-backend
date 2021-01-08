import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import SaleController from '@modules/sales/infra/http/controllers/SaleController';


const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.use(ensuredAthenticated);

saleRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    name: Joi.string().default(''),
    city: Joi.string().required(),
    status: Joi.string().valid(
      'NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO TOTAL'
    ).required(),
  }
}), saleController.index);

saleRoutes.post('/new', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().iso().max(Date()).required(),
    realty_ammount: Joi.number().min(0).required(),
    percentage_sale: Joi.number().min(0).required(),
    company: Joi.string().uuid(),
    commission: Joi.number().min(0).required(),
    bonus: Joi.number().min(0),
    origin: Joi.string().uuid().required(),
    payment_type: Joi.string().uuid().required(),
    realty: Joi.object({
      enterprise: Joi.string().required(),
      unit: Joi.string().required(),
      state: Joi.string().length(2).uppercase().required(),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      property: Joi.string().uuid().required(),
    }).required(),
    builder: Joi.string().uuid().required(),
    client_buyer: Joi.object({
      name: Joi.string().required(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
      whatsapp: Joi.string().required(),
      date_birth: Joi.date().iso().less(Date()).required(),
      occupation: Joi.string().required(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO').required(),
    }).required(),
    user_coordinator: Joi.string().uuid(),
    users_directors: Joi.array().min(2).max(2).required(),
    users_sellers: Joi.array().min(1).required(),
    installment: Joi.object({
      installment_number: Joi.number().integer().min(1).required(),
      value: Joi.number().min(0).required(),
      due_date: Joi.date().iso().greater(Date()).required(),
    }).required(),
  }
}), saleController.createSaleNew);


saleRoutes.post('/used', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().iso().max(Date()).required(),
    realty_ammount: Joi.number().min(0).required(),
    percentage_sale: Joi.number().min(0).required(),
    company: Joi.string().uuid(),
    commission: Joi.number().min(0).required(),
    bonus: Joi.number().min(0),
    origin: Joi.string().uuid().required(),
    payment_type: Joi.string().uuid().required(),
    realty: Joi.object({
      enterprise: Joi.string().required(),
      unit: Joi.string().required(),
      state: Joi.string().length(2).uppercase().required(),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      property: Joi.string().uuid().required(),
    }).required(),
    client_buyer: Joi.object({
      name: Joi.string().required(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
      whatsapp: Joi.string().required(),
      date_birth: Joi.date().iso().less(Date()).required(),
      occupation: Joi.string().required(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO').required(),
    }).required(),
    client_seller: Joi.object({
      name: Joi.string().required(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
      whatsapp: Joi.string().required(),
      date_birth: Joi.date().iso().less(Date()).required(),
      occupation: Joi.string().required(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO').required(),
    }).required(),
    user_coordinator: Joi.string().uuid(),
    users_directors: Joi.array().min(2).max(2).required(),
    users_captivators: Joi.array().min(1).required(),
    users_sellers: Joi.array().min(1).required(),
    installment: Joi.object({
      installment_number: Joi.number().integer().min(1).required(),
      value: Joi.number().min(0).required(),
      due_date: Joi.date().iso().greater(Date()).required(),
    }).required(), 
  }
}), saleController.createSaleUsed);


saleRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), saleController.show);

saleRoutes.patch('/valid/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
}), saleController.validSale);

saleRoutes.patch('/not-valid/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    motive: Joi.string().uuid().required(),
    another_motive: Joi.string(),
  }
}), saleController.notValidSale);

export default saleRoutes;
