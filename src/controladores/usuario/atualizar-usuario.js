const conexao = require('../../dados-sensiveis/conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
  const idUsuario = req.idToken;

  const { nome, email, senha } = req.body;

  try {
    const criptoSenha = await bcrypt.hash(senha, 10);

    await conexao('usuarios').where('id', idUsuario).update({
      nome,
      email,
      senha: criptoSenha,
    });

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = atualizarUsuario;
