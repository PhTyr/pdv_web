const conexao = require('../../dados-sensiveis/conexao');
const cpfValidator = require('cpf');

const validarCadastrarClientes = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    const { email, cpf } = req.body;

    if (!cpfValidator.isValid(cpf)) {
      return res.status(400).json({ mensagem: 'CPF inválido.' });
    }
    const usuario = await conexao.select('email').from('clientes').where({ email });

    if (usuario.length > 0) {
      return res.status(409).json({ mensagem: 'Email ja está em uso' });
    }

    const cpfExiste = await conexao.select('cpf').from('clientes').where({ cpf });

    if (cpfExiste.length > 0) {
      return res.status(400).json({ mensagem: 'CPF já cadastrado' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarCadastrarClientes;
