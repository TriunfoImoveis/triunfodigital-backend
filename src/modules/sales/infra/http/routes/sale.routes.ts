import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import SaleController from '@modules/sales/infra/http/controllers/SaleController';
import validatorFields from '@shared/infra/http/validators/validatorFields';


const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    name: Joi.string().allow(''),
    subsidiaryId: Joi.string().allow(''),
    month: Joi.string().allow(''),
    year: Joi.string().allow(''),
    status: Joi.string().valid(
      'NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO_TOTAL'
    ).allow(''),
  }
}), saleController.index);

saleRoutes.get('/export/excel',celebrate({
  [Segments.QUERY]: {
    name: Joi.string().allow(''),
    subsidiaryId: Joi.string().allow(''),
    month: Joi.string().allow(''),
    year: Joi.string().allow(''),
    status: Joi.string().valid(
      'NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO_TOTAL'
    ).allow(''),
  }
}), saleController.exportExcel);

saleRoutes.post('/new', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().iso().required()
      .messages(validatorFields({ name: "'data da venda'" })),
    realty_ammount: Joi.number().positive().required()
      .messages(validatorFields({ name: "'valor da venda'" })),
    percentage_sale: Joi.number().positive().required()
      .messages(validatorFields({ name: "'porcentagem da venda'" })),
    commission: Joi.number().positive().required()
      .messages(validatorFields({ name: "'comissão'" })),
    bonus: Joi.number().positive()
      .messages(validatorFields({ name: "'bônus'" })),
    origin: Joi.string().uuid().required()
      .messages(validatorFields({ name: "'origem'" })),
    payment_type: Joi.string().uuid().required()
      .messages(validatorFields({ name: "'forma de pagamento'" })),
    realty: Joi.object({
      enterprise: Joi.string().required()
        .messages(validatorFields({ name: "'empreendimento'" })),
      unit: Joi.string().required()
        .messages(validatorFields({ name: "'unidade'" })),
      state: Joi.string().length(2).uppercase().required()
        .messages(validatorFields({ name: "'estado'", max: 2 })),
      city: Joi.string().required()
        .messages(validatorFields({ name: "'cidade'" })),
      neighborhood: Joi.string().required()
        .messages(validatorFields({ name: "'bairro'" })),
      property: Joi.string().uuid().required()
        .messages(validatorFields({ name: "'tipo de imóvel'" })),
    }).required().messages(validatorFields({ name: "'imóvel'" })),
    builder: Joi.string().uuid().required()
      .messages(validatorFields({ name: "'construtora'" })),
    client_buyer: Joi.object({
      name: Joi.string().max(80).required()
        .messages(validatorFields({ name: "'nome do comprador'", max: 80 })),
      client_type: Joi.string().valid('FISICA', 'JURIDICA').required().messages(
        validatorFields({ name: "'tipo de cliente'", ref: "[FISICA, JURIDICA]" })),
      cpf: Joi.when('client_type', {
        is: "FISICA",
        then: Joi.string().pattern(/^[0-9]{11,11}$/).required()
          .messages(validatorFields({ name: "'cpf do comprador'", max: 11 })),
      }),
      cnpj: Joi.when('client_type', {
        is: "JURIDICA",
        then: Joi.string().pattern(/^[0-9]{14,14}$/).required()
          .messages(validatorFields({ name: "'cnpj do comprador'", max: 14 })),
      }),
      email: Joi.string().email().required()
        .messages(validatorFields({ name: "'email do comprador'" })),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/)
        .messages(validatorFields({ name: "'telefone do comprador'", max: 11 })),
      whatsapp: Joi.string().messages(validatorFields({ name: "'whatsapp do comprador'" })),
      date_birth: Joi.date().iso().messages(
        validatorFields({ name: "'data de nascimento do comprador'" })
      ),
      profession_id: Joi.string().uuid().messages(
        validatorFields({ name: "'segmento de atuação do comprador'" })
      ),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).messages(validatorFields({
        name: "'estado civil do comprador'",
        ref: "[CASADO(A), DIVORCIADO(A), SOLTEIRO(A), VIUVO(A)]"
      })),
      number_children: Joi.number().integer().min(0)
        .messages(validatorFields({ name: "'nº de filhos do comprador'", min: 0 })),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO')
        .messages(validatorFields({
          name: "'gênero do comprador'",
          ref: "[MASCULINO, FEMININO, OUTRO]"
        })),
      address: Joi.string().messages(validatorFields({ name: "'endereço do comprador'" })),
    }).required().messages(validatorFields({ name: "'cliente comprador'" })),
    user_coordinator: Joi.string().uuid()
      .messages(validatorFields({ name: "'coordenador'" })),
    users_directors: Joi.array().min(1).required()
      .messages(validatorFields({ name: "'diretor'", min: 1 })),
    users_sellers: Joi.array().min(1).required()
      .messages(validatorFields({ name: "'corretor'", min: 1 })),
    value_signal: Joi.number().positive().required()
      .messages(validatorFields({ name: "'valor do sinal'" })),
    pay_date_signal: Joi.date().iso().required()
      .messages(validatorFields({ name: "'data de pagamento do sinal'" })),
    observation: Joi.string().messages(validatorFields({ name: "'observação'" })),
    installments: Joi.array().items(
      Joi.object({
        installment_number: Joi.number().integer().positive().required()
          .messages(validatorFields({ name: "'número da parcela'" })),
        value: Joi.number().positive().required()
          .messages(validatorFields({ name: "'valor'" })),
        due_date: Joi.date().iso().required()
          .messages(validatorFields({ name: "'data de vencimento'" })),
      })
    ).min(1).required().messages(validatorFields({ name: "'parcelas'", min: 1 })),
    subsidiary: Joi.string().uuid().required().messages(validatorFields({ name: "'Filial'" })),
  }
}), saleController.createSaleNew);


saleRoutes.post('/used', celebrate({
  [Segments.BODY]: {
    sale_date: Joi.date().iso().required()
      .messages(validatorFields({ name: "'data da venda'" })),
    realty_ammount: Joi.number().positive().required()
      .messages(validatorFields({ name: "'valor da venda'" })),
    percentage_sale: Joi.number().positive().required()
      .messages(validatorFields({ name: "'porcentagem da venda'" })),
    commission: Joi.number().positive().required()
      .messages(validatorFields({ name: "'comissão'" })),
    bonus: Joi.number().positive()
      .messages(validatorFields({ name: "'bônus'" })),
    origin: Joi.string().uuid().required()
      .messages(validatorFields({ name: "'origem'" })),
    payment_type: Joi.string().uuid().required()
      .messages(validatorFields({ name: "'forma de pagamento'" })),
    realty: Joi.object({
      enterprise: Joi.string().required()
        .messages(validatorFields({ name: "'empreendimento'" })),
      unit: Joi.string().required()
        .messages(validatorFields({ name: "'unidade'" })),
      state: Joi.string().length(2).uppercase().required()
        .messages(validatorFields({ name: "'estado'", max: 2 })),
      city: Joi.string().required()
        .messages(validatorFields({ name: "'cidade'" })),
      neighborhood: Joi.string().required()
        .messages(validatorFields({ name: "'bairro'" })),
      property: Joi.string().uuid().required()
        .messages(validatorFields({ name: "'tipo de imóvel'" })),
    }).required().messages(validatorFields({ name: "'imóvel'" })),
    client_buyer: Joi.object({
      name: Joi.string().max(80).required()
        .messages(validatorFields({ name: "'nome do comprador'", max: 80 })),
      client_type: Joi.string().valid('FISICA', 'JURIDICA').required().messages(
        validatorFields({ name: "'tipo de cliente'", ref: "[FISICA, JURIDICA]" })),
      cpf: Joi.when('client_type', {
        is: "FISICA",
        then: Joi.string().pattern(/^[0-9]{11,11}$/).required()
          .messages(validatorFields({ name: "'cpf do comprador'", max: 11 })),
      }),
      cnpj: Joi.when('client_type', {
        is: "JURIDICA",
        then: Joi.string().pattern(/^[0-9]{14,14}$/).required()
          .messages(validatorFields({ name: "'cnpj do comprador'", max: 14 })),
      }),
      email: Joi.string().email().required()
        .messages(validatorFields({ name: "'email do comprador'" })),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/)
        .messages(validatorFields({ name: "'telefone do comprador'", max: 11 })),
      whatsapp: Joi.string().messages(validatorFields({ name: "'whatsapp do comprador'" })),
      date_birth: Joi.date().iso()
        .messages(validatorFields({ name: "'data de nascimento do comprador'" })),
      profession_id: Joi.string().uuid()
        .messages(validatorFields({ name: "'segmento de atuação do comprador'" })),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).messages(validatorFields({
        name: "'estado civil do comprador'",
        ref: "[CASADO(A), DIVORCIADO(A), SOLTEIRO(A), VIUVO(A)]"
      })),
      number_children: Joi.number().integer().min(0)
        .messages(validatorFields({ name: "'nº de filhos do comprador'", min: 0 })),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO')
        .messages(validatorFields({
          name: "'gênero do comprador'",
          ref: "[MASCULINO, FEMININO, OUTRO]"
        })),
      address: Joi.string().messages(validatorFields({ name: "'endereço do comprador'" })),
    }).required().messages(validatorFields({ name: "'cliente comprador'" })),
    client_seller: Joi.object({
      name: Joi.string().max(80).required()
        .messages(validatorFields({ name: "'nome do vendedor'", max: 80 })),
      client_type: Joi.string().valid('FISICA', 'JURIDICA').required().messages(
        validatorFields({ name: "'tipo de cliente'", ref: "[FISICA, JURIDICA]" })),
      cpf: Joi.when('client_type', {
        is: "FISICA",
        then: Joi.string().pattern(/^[0-9]{11,11}$/).required()
          .messages(validatorFields({ name: "'cpf do vendedor'", max: 11 })),
      }),
      cnpj: Joi.when('client_type', {
        is: "JURIDICA",
        then: Joi.string().pattern(/^[0-9]{14,14}$/).required()
          .messages(validatorFields({ name: "'cnpj do vendedor'", max: 14 })),
      }),
      email: Joi.string().email().required()
        .messages(validatorFields({ name: "'email do vendedor'" })),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/)
        .messages(validatorFields({ name: "'telefone do vendedor'", max: 11 })),
      whatsapp: Joi.string()
        .messages(validatorFields({ name: "'whatsapp do vendedor'" })),
      date_birth: Joi.date().iso()
        .messages(validatorFields({ name: "'data de nascimento do vendedor'" })),
      profession_id: Joi.string().uuid()
        .messages(validatorFields({ name: "'segmento de atuação do vendedor'" })),
      civil_status: Joi.string().valid(
        'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
      ).messages(validatorFields({
        name: "'estado civil do vendedor'",
        ref: "[CASADO(A), DIVORCIADO(A), SOLTEIRO(A), VIUVO(A)]"
      })),
      number_children: Joi.number().integer().min(0)
        .messages(validatorFields({ name: "'nº de filhos do vendedor'", min: 0 })),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO')
        .messages(validatorFields({
          name: "'gênero do vendedor'",
          ref: "[MASCULINO, FEMININO, OUTRO]"
        })),
      address: Joi.string().messages(validatorFields({ name: "'endereço do vendedor'" })),
    }).required().messages(validatorFields({ name: "'cliente vendedor'" })),
    user_coordinator: Joi.string().uuid()
      .messages(validatorFields({ name: "'coordenador'" })),
    users_directors: Joi.array().min(1).required()
      .messages(validatorFields({ name: "'diretor'", min: 1 })),
    users_captivators: Joi.array().min(1).required()
      .messages(validatorFields({ name: "'captador'", min: 1 })),
    users_sellers: Joi.array().min(1).required()
      .messages(validatorFields({ name: "'corretor'", min: 1 })),
    value_signal: Joi.number().positive().required()
      .messages(validatorFields({ name: "'valor do sinal'" })),
    pay_date_signal: Joi.date().iso().required()
      .messages(validatorFields({ name: "'data de pagamento do sinal'" })),
    observation: Joi.string().messages(validatorFields({ name: "'observação'" })),
    installments: Joi.array().items(
      Joi.object({
        installment_number: Joi.number().integer().positive().required()
          .messages(validatorFields({ name: "'número da parcela'" })),
        value: Joi.number().positive().required()
          .messages(validatorFields({ name: "'valor'" })),
        due_date: Joi.date().iso().required()
          .messages(validatorFields({ name: "'data de vencimento'" })),
      })
    ).min(1).required().messages(validatorFields({ name: "'parcelas'", min: 1 })),
    subsidiary: Joi.string().uuid().required().messages(validatorFields({ name: "'Filial'" })),
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
    sale_date: Joi.date().iso()
      .messages(validatorFields({ name: "'data da venda'" })),
    realty_ammount: Joi.number().positive()
      .messages(validatorFields({ name: "'valor da venda'" })),
    percentage_sale: Joi.number().positive()
      .messages(validatorFields({ name: "'porcentagem da venda'" })),
    commission: Joi.number().positive()
      .messages(validatorFields({ name: "'comissão'" })),
    company: Joi.string().uuid()
      .messages(validatorFields({ name: "'empresa'" })),
    percentage_company: Joi.number().positive()
      .messages(validatorFields({ name: "'porcentagem da empresa'" })),
    bonus: Joi.number().positive()
      .messages(validatorFields({ name: "'bônus'" })),
    origin: Joi.string().uuid()
      .messages(validatorFields({ name: "'origem'" })),
    payment_type: Joi.string().uuid()
      .messages(validatorFields({ name: "'forma de pagamento'" })),
    builder: Joi.string().uuid()
      .messages(validatorFields({ name: "'construtora'" })),
    realty: Joi.object({
      enterprise: Joi.string()
        .messages(validatorFields({ name: "'empreendimento'" })),
      unit: Joi.string()
        .messages(validatorFields({ name: "'unidade'" })),
      state: Joi.string().length(2).uppercase()
        .messages(validatorFields({ name: "'estado'", max: 2 })),
      city: Joi.string()
        .messages(validatorFields({ name: "'cidade'" })),
      neighborhood: Joi.string()
        .messages(validatorFields({ name: "'bairro'" })),
      property: Joi.string().uuid()
        .messages(validatorFields({ name: "'tipo de imóvel'" })),
    }),
    client_buyer: Joi.object({
      name: Joi.string().max(80)
        .messages(validatorFields({ name: "'nome do comprador'", max: 80 })),
      client_type: Joi.string().valid('FISICA', 'JURIDICA').messages(
        validatorFields({ name: "'tipo de cliente'", ref: "[FISICA, JURIDICA]" })),
      cpf: Joi.when('client_type', {
        is: "FISICA",
        then: Joi.string().pattern(/^[0-9]{11,11}$/).required()
          .messages(validatorFields({ name: "'cpf do comprador'", max: 11 })),
      }),
      cnpj: Joi.when('client_type', {
        is: "JURIDICA",
        then: Joi.string().pattern(/^[0-9]{14,14}$/).required()
          .messages(validatorFields({ name: "'cnpj do comprador'", max: 14 })),
      }),
      email: Joi.string().email()
        .messages(validatorFields({ name: "'email do comprador'" })),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/)
        .messages(validatorFields({ name: "'telefone do comprador'", max: 11 })),
      whatsapp: Joi.string()
        .messages(validatorFields({ name: "'whatsapp do comprador'" })),
      date_birth: Joi.date().iso()
        .messages(validatorFields({ name: "'data de nascimento do comprador'" })),
      profession_id: Joi.string().uuid()
        .messages(validatorFields({ name: "'profissão do comprador'" })),
      civil_status: Joi.string()
        .valid(
          'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
        )
        .messages(validatorFields({
          name: "'estado civil do comprador'",
          ref: "[CASADO(A), DIVORCIADO(A), SOLTEIRO(A), VIUVO(A)]"
        })),
      number_children: Joi.number().integer().min(0)
        .messages(validatorFields({ name: "'nº de filhos do comprador'", min: 0 })),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO')
        .messages(validatorFields({
          name: "'gênero do comprador'",
          ref: "[MASCULINO, FEMININO, OUTRO]"
        })),
      address: Joi.string().messages(validatorFields({ name: "'endereço do comprador'" })),
    }),
    client_seller: Joi.object({
      name: Joi.string()
        .messages(validatorFields({ name: "'nome do vendedor'" })),
      client_type: Joi.string().valid('FISICA', 'JURIDICA').messages(
        validatorFields({ name: "'tipo de cliente'", ref: "[FISICA, JURIDICA]" })),
      cpf: Joi.when('client_type', {
        is: "FISICA",
        then: Joi.string().pattern(/^[0-9]{11,11}$/).required()
          .messages(validatorFields({ name: "'cpf do comprador'", max: 11 })),
      }),
      cnpj: Joi.when('client_type', {
        is: "JURIDICA",
        then: Joi.string().pattern(/^[0-9]{14,14}$/).required()
          .messages(validatorFields({ name: "'cnpj do comprador'", max: 14 })),
      }),
      email: Joi.string().email()
        .messages(validatorFields({ name: "'email do vendedor'" })),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/)
        .messages(validatorFields({ name: "'telefone do vendedor'", max: 11 })),
      whatsapp: Joi.string()
        .messages(validatorFields({ name: "'whatsapp do vendedor'" })),
      date_birth: Joi.date().iso()
        .messages(validatorFields({ name: "'data de nascimento do vendedor'" })),
      profession_id: Joi.string().uuid()
        .messages(validatorFields({ name: "'profissão do vendedor'" })),
      civil_status: Joi.string()
        .valid(
          'CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)'
        )
        .messages(validatorFields({
          name: "'estado civil do vendedor'",
          ref: "[CASADO(A), DIVORCIADO(A), SOLTEIRO(A), VIUVO(A)]"
        })),
      number_children: Joi.number().integer().min(0)
        .messages(validatorFields({ name: "'nº de filhos do vendedor'", min: 0 })),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO')
        .messages(validatorFields({
          name: "'gênero do vendedor'",
          ref: "[MASCULINO, FEMININO, OUTRO]"
        })),
      address: Joi.string().messages(validatorFields({ name: "'endereço do vendedor'" })),
    }),
    user_coordinator: Joi.string().uuid().allow(null)
      .messages(validatorFields({ name: "'coordenador'" })),
    users_directors: Joi.array().length(2)
      .messages(validatorFields({ name: "'diretor'", max: 2 })),
    users_captivators: Joi.array().min(1)
      .messages(validatorFields({ name: "'captador'", min: 1 })),
    users_sellers: Joi.array().min(1)
      .messages(validatorFields({ name: "'corretor'", min: 1 })),
    value_signal: Joi.number().positive()
      .messages(validatorFields({ name: "'valor do sinal'" })),
    pay_date_signal: Joi.date().iso()
      .messages(validatorFields({ name: "'data de pagamento do sinal'" })),
    observation: Joi.string().messages(validatorFields({ name: "'observação'" })),
    status: Joi.string().valid(
      'NAO_VALIDADO', 'PENDENTE', 'PAGO_TOTAL'
    ).messages(validatorFields({
      name: "'status'",
      ref: "[NAO_VALIDADO, PENDENTE, PAGO_TOTAL]"
    })),
    subsidiary: Joi.string().uuid()
  }
}), saleController.update);

saleRoutes.patch('/valid-signal/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
}), saleController.validSignal);

saleRoutes.post('/update-sale-subsidiary', celebrate({
  [Segments.BODY]: {
    subsidiaryId: Joi.string().uuid().required().messages(validatorFields({ name: "'filial'" })),
  }
}), saleController.updateSaleSubsidiary);

export default saleRoutes;
