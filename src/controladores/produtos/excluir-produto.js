const conexao = require('../../dados-sensiveis/conexao');
const s3 = require('../../dados-sensiveis/conexaoAws');

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await conexao.select('produto_imagem').from('produtos').where({ id }).first();

    if (produto.produto_imagem) {
      await s3
        .deleteObject({
          Bucket: process.env.BACKBLAZE_BUCKET,
          Key: produto.produto_imagem.split(process.env.BACKBLAZE_BUCKET + '/')[1],
        })
        .promise();
    }

    await conexao('produtos').where({ id }).del();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: `${error.message}` });
  }
};

module.exports = excluirProduto;
