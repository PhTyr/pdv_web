const conexao = require('../../dados-sensiveis/conexao');
const jwt = require('jsonwebtoken');

const loginUsuario = async (req, res) => {
  const { email } = req.body;
  try {

    const usuario = await conexao
      .select('id', 'nome', 'email')
      .from('usuarios')
      .where({ email })
      .first();

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, {
      expiresIn: '8h',
    });

    return res.json({ usuario, token });
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = loginUsuario;
