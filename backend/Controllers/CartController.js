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
      // Criar um novo item no carrinho
      const cartItem = await db.Cart.create({
        IdProduto: IdProduto,
        IdCliente: IdCliente,
        quantidade: quantidade,
        total: (quantidade * product.preco).toFixed(2),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Atualizar a quantidade em estoque do produto
      product.Qtd_estoque -= quantidade;
      await product.save();

      return res.status(200).json(
        {
          message: 'Produto adicionado ao carrinho com sucesso.',
          data: cartItem,
        }
      );
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }

  },
  async ListCarts(req, res) {
    const IdCliente = req.params.id
    try {
      const CartProducts = db.Cart.findAll(
        {
          where: {
            IdCliente: IdCliente,
          },
          include: [
            {
              model: db.Produtos
            },
            {
              model: db.Clientes
            }
          ],

        }
      ).then((cartItens) => {
        res.status(200).json({
          message: 'Produtos do carrinho',
          data: cartItens,
          error: false
        })
      });
    } catch (error) {
      if (res.statusCode == 500) {
        res.json({
          message: "Erro interno no servido, por favor tente novamente",
          erro: error
        })
      } else if (res.statusCode == 400) {
        res.json({
          message: "Erro de usuário por favor tente novamente"
        })
      }
    }
  },

  async DeleteFromCart(req, res) {
    const itemId = req.params.id;
    try {
      // Verificar se o item do carrinho existe
      const cartItem = await db.Cart.findByPk(itemId);

      if (!cartItem) {
        return res.status(404).json({
          message: 'Item do carrinho não encontrado.'
        });
      }

      // Excluir o item do carrinho
      await cartItem.destroy();

      return res.status(200).json({
        message: 'Item do carrinho excluído com sucesso.'
      });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        error: 'Erro interno do servidor.'
      });
    }
  }
}