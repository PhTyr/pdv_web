const conexao = require('../../dados-sensiveis/conexao');

const listarUsuariologado = async (req, res) => {
  const idUsuario = req.idToken;
  try {
    const usuario = await conexao
      .select('id', 'nome', 'email')
      .from('usuarios')
      .where({ id: idUsuario })
      .first();

    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};
module.exports = listarUsuariologado;
