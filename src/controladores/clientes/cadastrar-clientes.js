const conexao = require('../../dados-sensiveis/conexao');

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const clienteCadastrado = await conexao('clientes')
      .insert({
        nome: nome,
        email: email,
        cpf: cpf,
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
      })
      .returning('*');

    return res.json(clienteCadastrado);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = cadastrarCliente;
