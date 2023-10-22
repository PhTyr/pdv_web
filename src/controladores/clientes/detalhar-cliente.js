const conexao = require('../../dados-sensiveis/conexao');

const obterClientePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await conexao('clientes').where({ id }).first();

    if (!cliente) {
      return res.status(400).json({ mensagem: 'Cliente não encontrado' });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = obterClientePorId;
