
---

# API de PDV (Ponto de Venda)

Bem-vindo à documentação da API de PDV (Ponto de Venda). Esta API permite gerenciar produtos, clientes, pedidos e categorias em um sistema de ponto de venda. Use esta documentação para entender como interagir com a API e realizar operações essenciais.

## Índice

- [Recursos Disponíveis](#recursos-disponíveis)
- [Autenticação](#autenticação)
- [Solicitações Básicas](#solicitações-básicas)
- [Exemplos de Uso](#exemplos-de-uso)
- [Status Codes](#status-codes)

## Recursos Disponíveis

- **Categorias**: Gerencie categorias de produtos.
- **Produtos**: Adicione, edite, liste e exclua produtos.
- **Clientes**: Cadastre, edite, liste e exclua clientes.
- **Pedidos**: Crie e liste pedidos de clientes.

## Autenticação

Para usar a API, você precisa de autenticação. Obtenha um token de autenticação fazendo uma solicitação de login para o endpoint apropriado.

## Solicitações Básicas

Todas as solicitações devem ser feitas para a URL base da API.

- URL base: `https://api-exemplo-pdv.com`

## Exemplos de Uso

### Autenticação

#### Login
- **Método**: `POST`
- **Rota**: `/login`
- **Descrição**: Loga o usuário e gera um token de autenticação.
- **Corpo da Solicitação**:
  ```json
  {
    "email": "seuemail@example.com",
    "senha": "suasenha"
  }
  ```
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "token": "seu-token-de-autenticacao"
  }
  ```

### Categorias

#### Listar Categorias
- **Método**: `GET`
- **Rota**: `/categorias`
- **Descrição**: Lista todas as categorias cadastradas.
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "categorias": [
      {
        "id": 1,
        "descricao": "Alimentos"
      },
      {
        "id": 2,
        "descricao": "Eletrônicos"
      }
    ]
  }
  ```

### Produtos

#### Listar Produtos
- **Método**: `GET`
- **Rota**: `/produtos`
- **Descrição**: Lista todos os produtos cadastrados.
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "produtos": [
      {
        "id": 1,
        "descricao": "Produto 1",
        "quantidade_estoque": 10,
        "valor": 1990,
        "categoria": "Eletrônicos"
      },
      {
        "id": 2,
        "descricao": "Produto 2",
        "quantidade_estoque": 15,
        "valor": 5990,
        "categoria": "Eletrônicos"
      }
    ]
  }
  ```

### Clientes

#### Listar Clientes
- **Método**: `GET`
- **Rota**: `/clientes`
- **Descrição**: Lista todos os clientes cadastrados.
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "clientes": [
      {
        "id": 1,
        "nome": "Cliente 1",
        "email": "cliente1@example.com",
        "cpf": "123.456.789-00"
      },
      {
        "id": 2,
        "nome": "Cliente 2",
        "email": "cliente2@example.com",
        "cpf": "987.654.321-00"
      }
    ]
  }
  ```

### Pedidos

#### Listar Pedidos
- **Método**: `GET`
- **Rota**: `/pedidos`
- **Descrição**: Lista todos os pedidos cadastrados.
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "pedidos": [
      {
        "id": 1,
        "cliente": "Cliente 1",
        "observacao": "Pedido de teste",
        "valor_total": 1990
      },
      {
        "id": 2,
        "cliente": "Cliente 2",
        "observacao": "Pedido de exemplo",
        "valor_total": 5990
      }
    ]
  }
  ```

## Status Codes

- `200 OK`: Solicitação bem-sucedida.
- `201 Created`: Recurso criado com sucesso.
- `204 No Content`: Solicitação bem-sucedida sem conteúdo no corpo da resposta.
- `400 Bad Request`: Erro de solicitação devido a sintaxe/formato inválido.
- `401 Unauthorized`: O usuário não está autenticado.
- `403 Forbidden`: O usuário não tem permissão de acesso.
- `404 Not Found`: O servidor não encontrou o recurso solicitado.
- `500 Internal Server Error`: Erro inesperado do servidor.
