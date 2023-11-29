const db = require("../../db/models/index");

module.exports = {
  async finalizarCompra(req, res) {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(400).json({
          msg: 'O usuário não existe',
          erro: true
        });
      }

      const cartItems = await db.CartItems.findAll({
        where: {
          id_customer: id
        },
        include: [db.Products] // Incluindo o modelo Produto para acessar os dados do produto relacionado
      });


      // Registrando os itens da compra na tabela de itens de compra
      for (let i = 0; i < cartItems.length; i++) {
        var items = await db.itensCarrinho.create({
          id_product: cartItems[i].Product.id,
          quantidade: cartItems[i].quantity,
          preco: cartItems[i].price,
        });
      }


      // Calculando o preço total da compra somando os subtotais dos itens
      let totalPrice = 0;
      for (let i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].price;
      }

      // Criando uma nova compra na tabela de Compras
      const novaCompra = await db.purchase.create({
        id_item: items.id,
        id_Product: items.id_product,
        totalPrice: totalPrice,
        purchaseDate: new Date()
      });
      // Removendo os itens do carrinho do usuário
      await db.CartItems.destroy({
        where: {
          id_customer: id
        }
      });

      res.status(200).json({
        msg: 'Compra finalizada com sucesso',
        data: novaCompra
      });
    } catch (error) {
      res.status(500).json({
        msg: 'Ocorreu um erro ao finalizar a compra',
        err: error.message
      });
    }
  },

  async listarCompra(req, res) {
    try {
      const compras = await db.purchase.findAll({
        include: {
          model: db.itensCarrinho,
          attributes: []
        },
        include: {
          include: db.Products,
          attributes: []
        }
      })

      if (!compras) {
        return res.status(400).send({
          msg: 'Nenhuma compra realizada'
        })
      }

      res.status(200).json({
        msg: 'compras encontradas',
        purchases: compras
      })
    } catch (error) {
      res.status(500).json({
        msg: 'ainda não foi efetuado nenhuma compra',
        err: error.message
      })
    }
  },

  async LimparTudo(req, res) {
    const { id } = req.params;
    try {
      let cart = await CartItems.destroy({
        where: {
          id_customer: id
        }
      })
      if (!cart) {
        return res.status(401).json({
          msg: 'não há itens no carrinho para limpar',
          data: cart
        })
      }
      res.status(200).json({ msg: "tudo limpo" });
    } catch (err) {
      res.status(500).json({
        msg: 'erro interno do servidor',
        err: err.message
      })
    }
  },

  async cancelarCompra(req, res) {
    //caso o cliente desista da compra nesse estágio ele deve ser cancelado e apagado da tabela purchase
  },
};
