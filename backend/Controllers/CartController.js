const db = require('../db/models/index')
module.exports = {
  async CreateCart(req, res) {
    try {
      const { quantidade, IdProduto, IdCliente } = req.body;

      // Verificar se o produto existe no banco de dados
      const product = await db.Produtos.findByPk(IdProduto);
      const cliente = await db.Clientes.findByPk(IdCliente)


      // Verificar se o produto e o usuário existem
      if (!product) {
        res.status(404).json({ message: 'O produto ou usuário informado não existe' });
      } else if (product.Qtd_estoque < quantidade) {
        res.status(404).json(
          {
            message: "o produto está em falta no estoque"
          }
        )
      }
      let preco = quantidade * product.preco;
      // Criar um novo item no carrinho
      const cartItem = await db.Cart.create({
        IdProduto: product,
        IdCliente: IdCliente,
        quantidade: quantidade,
        total: preco.toFixed(2),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Atualizar a quantidade em estoque do produto
      product.Qtd_estoque -= quantidade;
      await product.save();

      return res.status(200).json(
        {
          message: 'Produto adicionado ao carrinho com sucesso.',
          data: cartItem
        }
      );
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }

  },
  async ListCarts(req, res){
      try {
        
      } catch (error) {
        
      }
  }
}