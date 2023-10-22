const conexao = require('../../dados-sensiveis/conexao');

const validarCadastroPedidos = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);

    const { cliente_id, pedido_produtos } = req.body;

    const cliente = await conexao('clientes').where('id', cliente_id).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }

    for (let pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

      const produto = await conexao('produtos').where('id', produto_id).first();
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      if (quantidade_produto > produto.quantidade_estoque) {
        return res.status(400).json({ mensagem: 'Quantidade insuficiente em estoque para o produto' });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarCadastroPedidos;
