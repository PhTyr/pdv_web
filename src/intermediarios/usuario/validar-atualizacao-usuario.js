const conexao = require('../../dados-sensiveis/conexao');

const validarAtualizacaoUsuario = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);

    const idUsuario = req.idToken;
    const { email } = req.body;
    const usuario = await conexao
      .select('email')
      .from('usuarios')
      .where({ email })
      .whereNot({ id: idUsuario });

    if (usuario.length > 0) {
      return res.status(409).json({ mensagem: 'Email ja está em uso.' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarAtualizacaoUsuario;
