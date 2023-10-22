const senhaJWT = process.env.SENHA_JWT;
const jwt = require('jsonwebtoken');

const validacaoToken = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || authorization === 'Bearer') {
      return res.status(400).json({
        mensagem: 'Token não informado, informe o token fazendo o login!',
      });
    }

    const token = authorization.split(' ')[1];
    const { id } = jwt.verify(token, senhaJWT);

    if (!id) {
      return res.status(401).json({ mensagem: 'Token Incorreto Ou Expirado' });
    }

    req.idToken = id;

    next();
  } catch (error) {
    const erros = {
      'jwt malformed': 'Formato Incorreto Do Token',
      'jwt expired': 'Token Incorreto Ou Expirado',
      'invalid signature': 'Token Incorreto Ou Expirado',
    };

    const mensagemErro = erros[error.message] || error.message;

    return res
      .status(['jwt malformed', 'jwt expired'].includes(error.message) ? 400 : 401)
      .json({ mensagem: mensagemErro });
  }
};

module.exports = validacaoToken;
