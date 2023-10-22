const conexao = require('../../dados-sensiveis/conexao');
const s3 = require('../../dados-sensiveis/conexaoAws');

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;

  try {
    const produto = await conexao('produtos')
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning('*');

    if (file) {
      const arquivo = await s3
        .upload({
          Bucket: process.env.BACKBLAZE_BUCKET,
          Key: `imagens/produtos/${produto[0].id}/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      const produtoCadastrado = await conexao('produtos')
        .where({ id: produto[0].id })
        .update({
          produto_imagem: arquivo.Location,
        })
        .returning('*');

      const produtoSemId = { ...produtoCadastrado[0] };
      delete produtoSemId.id;

      return res.status(201).json(produtoSemId);
    }

    const produtoSemId = { ...produto[0] };
    delete produtoSemId.id;

    return res.status(201).json(produtoSemId);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = cadastrarProduto;
