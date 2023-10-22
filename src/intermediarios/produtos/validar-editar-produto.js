const conexao = require('../../dados-sensiveis/conexao');

const validarEditarProduto = (joiSchema) => async (req, res, next) => {
  const { id } = req.params;
  try {
    await joiSchema.validateAsync(req.body);
    const { categoria_id } = req.body;

    const categoria = await conexao.select('id').from('categorias').where({ id: categoria_id });
    const produto = await conexao.select('id').from('produtos').where({ id });

    if (categoria.length < 1) {
      return res.status(400).json({ mensagem: 'A categoria informada não existe' });
    }
    if (produto.length < 1) {
      return res.status(400).json({ mensagem: 'O id do produto informado não existe' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = validarEditarProduto;
