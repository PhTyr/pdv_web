const conexao = require('../../dados-sensiveis/conexao');

const validarCadastroPoduto = (joiSchema) => async (req, res, next) => {
  const { categoria_id } = req.body;
  try {
    await joiSchema.validateAsync(req.body);

    const categoria = await conexao.select('id').from('categorias').where({ id: categoria_id });

    if (categoria.length < 1) {
      return res.status(400).json({ mensagem: 'A categoria informada não existe' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarCadastroPoduto;
