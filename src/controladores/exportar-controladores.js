//arquivo dedicado a requisitar e exportar controladores
const loginUsuario = require('./usuario/login-usuario');
const listarUsuariologado = require('./usuario/listar-usuario-logado');
const listarCategorias = require('./categorias/listar-categoria');
const atualizarUsuario = require('./usuario/atualizar-usuario');
const cadastrarUsuario = require('./usuario/cadastrar-usuario');
const CadastrarProduto = require('./produtos/cadastrar-produto');
const editarProduto = require('./produtos/editar-produto');
const excluirProduto = require('./produtos/excluir-produto');
const cadastrarCliente = require('./clientes/cadastrar-clientes');
const editarCliente = require('./clientes/editar-clientes');
const listarClientes = require('./clientes/listar-clientes');
const detalharProduto = require('./produtos/detalhar-produto');
const listarProduto = require('./produtos/listar-produto');
const obterClientePorId = require('./clientes/detalhar-cliente');
const listarPedidos = require('./pedidos/listarPedidos');
const cadastrarPedidos = require('./pedidos/cadastrarPedido');

const controladores = {
  loginUsuario,
  listarCategorias,
  listarUsuariologado,
  listarProduto,
  listarClientes,
  listarPedidos,
  atualizarUsuario,
  editarProduto,
  editarCliente,
  excluirProduto,
  cadastrarUsuario,
  CadastrarProduto,
  cadastrarCliente,
  detalharProduto,
  obterClientePorId,
  cadastrarPedidos,
};
module.exports = controladores;
