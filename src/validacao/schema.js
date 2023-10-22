const joi = require('joi');

const schemaEmailSenha = joi.object({
  email: joi.string().trim().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
  }),
  senha: joi.string().trim().required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
  }),
});

const schemaNomeEmailSenha = joi.object({
  nome: joi.string().trim().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome é obrigatório',
  }),
  email: joi.string().trim().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
  }),
  senha: joi.string().trim().min(8).required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha precisa conter, no mínimo, 8 caracteres',
  }),
});

const schemaCliente = joi.object({
  nome: joi.string().trim().required().messages({
    'any.required': 'O campo nome é obrigatório.',
    'string.empty': 'O campo nome não pode estar vazio.',
  }),
  email: joi.string().trim().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido.',
    'any.required': 'O campo email é obrigatório.',
    'string.empty': 'O campo email não pode estar vazio.',
  }),
  cpf: joi
    .string()
    .trim()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.pattern.base': 'O campo CPF deve conter exatamente 11 dígitos numéricos.',
      'any.required': 'O campo CPF é obrigatório.',
      'string.empty': 'O campo CPF não pode estar vazio.',
    }),
  cep: joi.string().trim(),
  rua: joi.string().trim(),
  numero: joi.string().trim(),
  bairro: joi.string().trim(),
  cidade: joi.string().trim(),
  estado: joi.string().trim().length(2).messages({
    'string.length': 'O campo estado deve conter exatamente 2 caracteres.',
  }),
});

const schemaDescriQuantValorCatego = joi.object({
  descricao: joi.string().trim().required().messages({
    'any.required': 'O campo descricao é obrigatório',
    'string.empty': 'O campo descricao é obrigatório',
  }),
  quantidade_estoque: joi.number().integer().required().messages({
    'any.required': 'O campo quantidade_estoque é obrigatório',
    'string.empty': 'O campo quantidade_estoque é obrigatório',
    'number.base': 'O campo quantidade_estoque deve ser um número',
  }),
  valor: joi.number().required().messages({
    'any.required': 'O campo valor é obrigatório',
    'string.empty': 'O campo valor é obrigatório',
    'number.base': 'O campo valor deve ser um número',
  }),
  categoria_id: joi.number().integer().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'string.empty': 'O campo categoria_id é obrigatório',
    'number.base': 'O campo categoria_id deve ser um número',
  }),
});

const schemaCadastrarPedido = joi.object({
  cliente_id: joi.number().integer().required().messages({
    'any.required': 'O campo cliente_id é obrigatório',
    'number.base': 'O campo cliente_id deve ser um número inteiro',
  }),

  observacao: joi.string(),

  pedido_produtos: joi
    .array()
    .min(1)
    .items(
      joi.object({
        produto_id: joi.number().integer().required().messages({
          'any.required': 'O campo produto_id é obrigatório',
          'number.base': 'O campo produto_id deve ser um número inteiro',
        }),
        quantidade_produto: joi.number().integer().required().messages({
          'any.required': 'O campo quantidade_produto é obrigatório',
          'number.base': 'O campo quantidade_produto deve ser um número inteiro',
        }),
      })
    )
    .required()
    .messages({
      'array.min': 'Pelo menos um produto deve ser incluído no pedido',
      'any.required': 'O campo pedido_produtos é obrigatório',
    }),
});

module.exports = {
  schemaEmailSenha,
  schemaNomeEmailSenha,
  schemaCliente,
  schemaDescriQuantValorCatego,
  schemaCadastrarPedido,
};
