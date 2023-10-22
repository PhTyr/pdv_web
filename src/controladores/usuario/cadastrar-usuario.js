const bcrypt = require('bcrypt');
const conexao = require('../../dados-sensiveis/conexao');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await conexao('usuarios').insert({ nome: nome, email: email, senha: senhaCriptografada }).returning('*');

    return res.json(usuarioCadastrado);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = cadastrarUsuario;
