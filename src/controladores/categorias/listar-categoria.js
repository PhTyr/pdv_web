const conexao = require('../../dados-sensiveis/conexao');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await conexao('categorias');
    return res.json(categorias);
  } catch (error) {
    return res.json({ mensagem: `${error.message}` });
  }
};

module.exports = listarCategorias;
