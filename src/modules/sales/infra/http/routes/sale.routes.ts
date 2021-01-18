import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import SaleController from '@modules/sales/infra/http/controllers/SaleController';


const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    name: Joi.string().default(''),
    city: Joi.string().required(),
    status: Joi.string().valid(
      'NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO_TOTAL'
    ).required(),
  }
}), saleController.index);

saleRoutes.post('/new', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().iso().required(),
    realty_ammount: Joi.number().positive().required(),
    percentage_sale: Joi.number().positive().required(),
    commission: Joi.number().positive().required(),
    bonus: Joi.number().positive(),
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
      date_birth: Joi.date().iso().required(),
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
      value: Joi.number().positive().required(),
      due_date: Joi.date().iso().required(),
    }).required(),
  }
}), saleController.createSaleNew);


saleRoutes.post('/used', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().iso().required(),
    realty_ammount: Joi.number().positive().required(),
    percentage_sale: Joi.number().positive().required(),
    commission: Joi.number().positive().required(),
    bonus: Joi.number().positive(),
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
      date_birth: Joi.date().iso().required(),
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
      date_birth: Joi.date().iso().required(),
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
      value: Joi.number().positive().required(),
      due_date: Joi.date().iso().required(),
    }).required(), 
  }
}), saleController.createSaleUsed);

saleRoutes.use(ensuredAthenticated);

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

saleRoutes.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    sale_date: Joi.date().iso(),
    realty_ammount: Joi.number().positive(),
    percentage_sale: Joi.number().positive(),
    commission: Joi.number().positive(),
    company: Joi.string().uuid(),
    percentage_company: Joi.number().positive(),
    bonus: Joi.number().positive(),
    origin: Joi.string().uuid(),
    payment_type: Joi.string().uuid(),
    builder: Joi.string().uuid(),
    realty: Joi.object({
      enterprise: Joi.string(),
      unit: Joi.string(),
      state: Joi.string().length(2).uppercase(),
      city: Joi.string(),
      neighborhood: Joi.string(),
      property: Joi.string().uuid(),
    }),
    client_buyer: Joi.object({
      name: Joi.string(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/),
      email: Joi.string().email(),
      phone: Joi.string().pattern(/^[0-9]{10,11}$/),
      whatsapp: Joi.string(),
      date_birth: Joi.date().iso(),
      occupation: Joi.string(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ),
      number_children: Joi.number().integer().min(0),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO'),
    }),
    client_seller: Joi.object({
      name: Joi.string(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/),
      email: Joi.string().email(),
      phone: Joi.string().pattern(/^[0-9]{10,11}$/),
      whatsapp: Joi.string(),
      date_birth: Joi.date().iso(),
      occupation: Joi.string(),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ),
      number_children: Joi.number().integer().min(0),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO'),
    }),
    user_coordinator: Joi.string().uuid(),
    users_directors: Joi.array().min(2).max(2),
    users_captivators: Joi.array().min(1),
    users_sellers: Joi.array().min(1),
  }
}), saleController.update);

export default saleRoutes;
