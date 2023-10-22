const conexao = require('../../dados-sensiveis/conexao');
const bcrypt = require('bcrypt');

const validarLogin = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);

    const { email, senha } = req.body;

    const usuario = await conexao
      .select('nome', 'email', 'senha')
      .from('usuarios')
      .where({ email });

    if (usuario.length < 1) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    const senhaValidada = await bcrypt.compare(senha, usuario[0].senha);

    if (!senhaValidada) {
      return res.status(401).json({ mensagem: 'email ou senha incorretos' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarLogin;
