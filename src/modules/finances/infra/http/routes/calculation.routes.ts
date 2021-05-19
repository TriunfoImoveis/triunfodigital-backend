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
    balance: Joi.number().positive().required().messages(validatorFields({name: "'saldo'"})),
    note_number: Joi.string().alphanum().messages(validatorFields({name: "'número da NF'"})),
    note_value: Joi.number().positive().messages(validatorFields({name: "'valor da NF'"})),
    tax_rate_nf: Joi.number().positive().messages(validatorFields({name: "'taxa total de imposto da NF'"})),
    tax_iss_nf: Joi.number().positive().messages(validatorFields({name: "'taxa de imposto ISS da NF'"})),
    value_iss: Joi.number().positive().messages(validatorFields({name: "'debito ISS'"})),
    tax_collection: Joi.number().positive().messages(validatorFields({name: "'recolhimento de imposto'"})),
    divisions: Joi.array().items(
      Joi.object({
        division_type: Joi.string().uuid().required().messages(validatorFields({name: "'tipo de divisão'"})),
        percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem'"})),
        value: Joi.number().positive().required().messages(validatorFields({name: "'valor'"}))
      }).required(),
    ).length(6).required().messages(validatorFields({name: "'divisões'", max: 6})),
    participants: Joi.array().items(
      Joi.object({
        participant_type: Joi.string().valid(
          "VENDEDOR", "CAPTADOR", "COORDENADOR", "DIRETOR", "EMPRESA"
        ).required().messages(validatorFields({name: "'tipo de participante'"})),
        comission_percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem da comissão'"})),
        comission_integral: Joi.number().positive().required().messages(validatorFields({name: "'comissão bruta'"})),
        tax_percentage: Joi.number().positive().required().messages(validatorFields({name: "'porcentagem do imposto'"})),
        tax_value: Joi.number().positive().required().messages(validatorFields({name: "'valor do imposto'"})),
        comission_liquid: Joi.number().positive().required().messages(validatorFields({name: "'comissão liquida'"})),
        user: Joi.string().uuid().messages(validatorFields({name: "'usuário participante'"})),
      }).required(),
    ).min(3).required().messages(validatorFields({name: "'comissões dos participantes'", min: 3})),
  }
}), calculationController.createCalculation);

export default calculationRoutes;