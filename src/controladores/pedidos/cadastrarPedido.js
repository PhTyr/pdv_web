const conexao = require('../../dados-sensiveis/conexao');
const transportador = require('../../dados-sensiveis/emailConfig');

const cadastrarPedido = async (req, res) => {
  try {
    const { cliente_id, pedido_produtos, observacao } = req.body;

    const pedidoCadastrado = await conexao('pedidos')
      .insert({
        cliente_id,
        observacao,
      })
      .returning('id');

    const pedidoId = pedidoCadastrado[0].id;
    let valorTotal = 0;

    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

      const produto = await conexao('produtos').where('id', produto_id).first();

      const valorProduto = produto.valor;
      valorTotal += valorProduto * quantidade_produto;

      await conexao('pedido_produtos').insert({
        pedido_id: pedidoId,
        produto_id,
        quantidade_produto,
        valor_produto: valorProduto,
      });
    }

    await conexao('pedidos').where('id', pedidoId).update({
      valor_total: valorTotal,
    });

    const cliente = await conexao('clientes').where('id', cliente_id).first();
    transportador.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${cliente.nome} <${cliente.email}>`,
      subject: 'Pedido Cadastrado com Sucesso',
      text: 'Seu pedido foi cadastrado com sucesso. Obrigado por escolher nossa empresa!',
    });

    return res.status(200).json({ mensagem: 'Pedido cadastrado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = cadastrarPedido;
