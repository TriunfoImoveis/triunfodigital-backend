import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import SaleController from '@modules/sales/infra/http/controllers/SaleController';


const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.get('/', saleController.index);

saleRoutes.use(ensuredAthenticated);

saleRoutes.post('/new', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().required(),
    realty_ammount: Joi.number().required(),
    percentage_sale: Joi.number().required(),
    percentage_company: Joi.number().required(),
    commission: Joi.number().required(),
    bonus: Joi.string(),
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
      date_birth: Joi.date().required(),
      occupation: Joi.string().required(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO').required(),
    }).required(),
    user_director: Joi.string().uuid().required(),
    user_coordinator: Joi.string().uuid(),
    users_sellers: Joi.array().required(),
  }
}), saleController.createSaleNew);


saleRoutes.post('/used', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().required(),
    realty_ammount: Joi.number().required(),
    percentage_sale: Joi.number().required(),
    percentage_company: Joi.number().required(),
    commission: Joi.number().required(),
    bonus: Joi.string(),
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
      date_birth: Joi.date().required(),
      occupation: Joi.string().required(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO').required(),
    }).required(),
    client_seller: Joi.object({
      name: Joi.string().required(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
      date_birth: Joi.date().required(),
      occupation: Joi.string().required(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO').required(),
    }).required(),
    user_director: Joi.string().uuid().required(),
    user_coordinator: Joi.string().uuid(),
    users_captivators: Joi.array().required(),
    users_sellers: Joi.array().required(),
  }
}), saleController.createSaleUsed);


saleRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), saleController.show);

export default saleRoutes;
