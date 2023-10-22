const conexao = require('../../dados-sensiveis/conexao');

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;
  let acharPedido, acharPedidoProdutos;
  try {
    if (!cliente_id) {
      acharPedido = await conexao('pedidos');
      acharPedidoProdutos = await conexao('pedido_produtos');
      return res.json([{ pedidos: acharPedido }, { pedido_produtos: acharPedidoProdutos }]);
    }

    acharPedido = await conexao('pedidos').where({ cliente_id }).first();

    if (!acharPedido) {
      return res.status(400).json({ mensagem: 'Não existe pedido para id cliente infromado' });
    }

    acharPedidoProdutos = await conexao('pedido_produtos').where({ pedido_id: acharPedido.id });

    return res.json([{ pedido: acharPedido }, { pedido_produtos: acharPedidoProdutos }]);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = listarPedidos;
