const conexao = require('../../dados-sensiveis/conexao');

const validarCadastrarUsuario = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);

    const { email } = req.body;
    const usuario = await conexao.select('email').from('usuarios').where({ email });

    if (usuario.length > 0) {
      return res.status(409).json({ mensagem: 'Email ja está em uso' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarCadastrarUsuario;
