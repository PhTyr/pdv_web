//arquivo dedicado a requisitar e exportar intermediarios
const validarLogin = require('./usuario/validar-login');
const validacaoToken = require('./usuario/validar-token');
const validarAtualizacaoUsuario = require('./usuario/validar-atualizacao-usuario');
const validarCadastrarUsuario = require('./usuario/validar-cadastrar-usuario');
const validarCadastrarClientes = require('./clientes/validar-cadastrar-clientes');
const validarEditarClientes = require('./clientes/validar-editar-clientes');
const validarCadastrarProduto = require('./produtos/validar-cadastro-produto');
const validarEditarProduto = require('./produtos/validar-editar-produto');
const validarExclusaoProduto = require('./produtos/validar-exclusao-produto');
const joiError = require('./erros-joi');
const validarCadastroPedidos = require('./pedidos/validar-cadastro-pedido');

const intermediarios = {
  validarLogin,
  validacaoToken,
  validarAtualizacaoUsuario,
  validarCadastrarUsuario,
  validarCadastrarClientes,
  validarEditarClientes,
  validarEditarProduto,
  validarExclusaoProduto,
  validarCadastrarProduto,
  joiError,
  validarCadastroPedidos,
};

module.exports = intermediarios;
