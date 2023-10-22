const conexao = require('../../dados-sensiveis/conexao');

const listarClientes = async (req, res) => {
  try {
    const clientes = await conexao.select().from('clientes');

    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};
module.exports = listarClientes;
