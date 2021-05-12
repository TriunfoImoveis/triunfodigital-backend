import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import CalculatorController from "@modules/finances/infra/http/controllers/CalculatorController";
import ensuredAuthenticated from "@shared/infra/http/middlewares/ensuredAuthenticated";
import validatorFields from "@shared/infra/http/validators/validatorFields";


const calculationRoutes = Router();
const calculationController = new CalculatorController();

calculationRoutes.use(ensuredAuthenticated);

calculationRoutes.get('/division_types', calculationController.findaAllDivision);

calculationRoutes.post('/division_types', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), calculationController.createDivision);

calculationRoutes.post('/', celebrate({
  [Segments.BODY]: {
    installment: Joi.string().uuid().required().messages(validatorFields({name: "'parcela'"})),
    calculator_type: Joi.string().messages(validatorFields({name: "'tipo de calculadora'"})),
    note_value: Joi.number().positive().required().messages(validatorFields({name: "'Valor da NF'"})),
    tax_rate: Joi.number().positive().required().messages(validatorFields({name: "'taxa de imposto'"})),
    division_pl: Joi.object({
      division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
      percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
      value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
    }).required().messages(validatorFields({name: "'divisão de PL'"})),
    division_lucro: Joi.object({
      division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
      percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
      value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
    }).required().messages(validatorFields({name: "'divisão de lucro'"})),
    division_tax: Joi.object({
      division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
      percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
      value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
    }).required().messages(validatorFields({name: "'divisão de imposto'"})),
    division_other_one: Joi.object({
      division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
      percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
      value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
    }).required(),
    division_other_two: Joi.object({
      division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
      percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
      value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
    }).required(),
    division_other_three: Joi.object({
      division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
      percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
      value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
    }).required(),
  }
}), calculationController.createCalculation);

export default calculationRoutes;