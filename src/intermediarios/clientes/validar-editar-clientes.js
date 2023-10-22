const conexao = require('../../dados-sensiveis/conexao');
const cpfValidator = require('cpf');

const validarEditarClientes = (joiSchema) => async (req, res, next) => {
  const { id } = req.params;
  try {
    await joiSchema.validateAsync(req.body);

    const { email, cpf } = req.body;

    if (!cpfValidator.isValid(cpf)) {
      return res.status(400).json({ mensagem: 'CPF inválido.' });
    }

    const idCliente = await conexao.select('id').from('clientes').where({ id });
    if (idCliente.length < 1) {
      return res.status(400).json({ mensagem: 'O id do cliente informado não existe' });
    }

    const cliente = await conexao
      .select('email')
      .from('clientes')
      .where({ email })
      .whereNot({ id });
    if (cliente.length > 0) {
      return res.status(409).json({ mensagem: 'Email ja está em uso' });
    }

    const cpfExiste = await conexao.select('cpf').from('clientes').where({ cpf }).whereNot({ id });
    if (cpfExiste.length > 0) {
      return res.status(400).json({ mensagem: 'CPF já cadastrado' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarEditarClientes;
