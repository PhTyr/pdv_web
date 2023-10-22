const express = require('express');
const rota = express.Router();
const {
  schemaEmailSenha,
  schemaNomeEmailSenha,
  schemaCliente,
  schemaDescriQuantValorCatego,
  schemaCadastrarPedido,
} = require('./validacao/schema');
const {
  validarLogin,
  joiError,
  validarCadastrarUsuario,
  validarAtualizacaoUsuario,
  validarCadastrarProduto,
  validarEditarProduto,
  validarExclusaoProduto,
  validarCadastrarClientes,
  validarEditarClientes,
  validacaoToken,
  validarCadastroPedidos,
} = require('./intermediarios/exportar-intermediarios');
const {
  loginUsuario,
  listarCategorias,
  cadastrarUsuario,
  listarUsuariologado,
  atualizarUsuario,
  CadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProduto,
  excluirProduto,
  cadastrarCliente,
  editarCliente,
  listarClientes,
  obterClientePorId,
  listarPedidos,
  cadastrarPedidos,
} = require('./controladores/exportar-controladores');
const multer = require('./intermediarios/multer');

rota.post('/login', validarLogin(schemaEmailSenha), joiError, loginUsuario);
rota.get('/categoria', listarCategorias);
rota.post('/usuario', validarCadastrarUsuario(schemaNomeEmailSenha), joiError, cadastrarUsuario);

rota.use(validacaoToken);

rota.get('/usuario', listarUsuariologado);
rota.get('/produto/:id', detalharProduto);
rota.get('/produto', listarProduto);
rota.get('/cliente', listarClientes);
rota.get('/cliente/:id', obterClientePorId);
rota.get('/pedido', listarPedidos);

rota.put('/usuario', validarAtualizacaoUsuario(schemaNomeEmailSenha), joiError, atualizarUsuario);
rota.put('/produto/:id', multer.single('arquivo'), validarEditarProduto(schemaDescriQuantValorCatego), joiError, editarProduto);
rota.put('/cliente/:id', validarEditarClientes(schemaCliente), joiError, editarCliente);

rota.post(
  '/produto',
  multer.single('arquivo'),
  validarCadastrarProduto(schemaDescriQuantValorCatego),
  joiError,
  CadastrarProduto
);
rota.post('/cliente', validarCadastrarClientes(schemaCliente), joiError, cadastrarCliente);
rota.post('/pedido', validarCadastroPedidos(schemaCadastrarPedido), joiError, cadastrarPedidos);

rota.delete('/produto/:id', validarExclusaoProduto, excluirProduto);

module.exports = rota;
