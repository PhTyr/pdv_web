const conexao = require('../../dados-sensiveis/conexao');

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoId = await conexao('produtos').where({ id });
    return res.json(produtoId);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = detalharProduto;
