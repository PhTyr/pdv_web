const conexao = require('../../dados-sensiveis/conexao');

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    await conexao('clientes').where({ id }).update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });
    return res.json({ mensagem: `cliente ${nome} alterado com sucesso` });
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = editarCliente;
