const conexao = require('../../dados-sensiveis/conexao');
const s3 = require('../../dados-sensiveis/conexaoAws');

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;

  try {

    const produto = await conexao('produtos').where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    }).returning('*');

    if (file) {
      const arquivo = await s3
        .upload({
          Bucket: process.env.BACKBLAZE_BUCKET,
          Key: `imagens/produtos/${produto[0].id}/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      const produtoAtualizado = await conexao('produtos')
        .where({ id: produto[0].id })
        .update({
          produto_imagem: arquivo.Location,
        })
        .returning('*');

      const produtoSemId = { ...produtoAtualizado[0] };
      delete produtoSemId.id;

      return res.status(200).json(produtoSemId);
    }
    const produtoSemId = { ...produto[0] };
    delete produtoSemId.id;

    return res.status(200).json(produtoSemId);
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = editarProduto;
