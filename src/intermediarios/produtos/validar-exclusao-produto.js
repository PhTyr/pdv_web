const conexao = require('../../dados-sensiveis/conexao');

const validarExclusaoProduto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produto = await conexao('produtos').where({ id });
    if (produto.length < 1) {
      return res.status(400).json({ mensagem: 'Produto não existe' });
    }

    const pedidoProduto = await conexao('pedido_produtos').where({ produto_id: id });

    if (pedidoProduto.length > 0) {
      return res.status(403).json({ mensagem: 'produto vinculado a pedido, não pode ser excluido' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = validarExclusaoProduto;
