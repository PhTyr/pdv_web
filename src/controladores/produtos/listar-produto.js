const conexao = require('../../dados-sensiveis/conexao');

const listarProduto = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (!categoria_id) {
      const produtos = await conexao('produtos').orderBy('id');
      return res.json(produtos);
    }

    const produtos = await conexao('produtos').where({ categoria_id }).orderBy('id').first();

    if (!produtos) {
      return res.status(400).json({ mensagem: 'categoria de produto informada não existente' });
    }

    return res.json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = listarProduto;
