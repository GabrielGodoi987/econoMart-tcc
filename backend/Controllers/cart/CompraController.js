const db = require("../../db/models/index");

module.exports = {
  async finalizarCompra(req, res) {
    //pegar do estoque diminuindo a quantidade escolhida pelo usuário
    //chamar os itens do carrinho com base no id do cliente
    //adicionar esses dados vindo do carrinho na model purchase
    //apagar os dados do carrinho do cliente
    //multiplicar a quantidade total pelo valor de cada produto, somar e mostra na tela de compra
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        msg: 'O usuário não existe seu bosta',
        erro: true
      })
    }

    try {
      let cart = await db.CartItems.findAll({
        where: {
          id_customer: id
        }
      })

      let price = 0;
      for (let i = 0; i < cart.length; i++) {
        price += cart[i].price;
      }

      const compra = await db.purchases.create({
        id_cart: cart.id,
        totalPrice: price,
        purchaseDate: new Date()
      })

      await db.CartItems.destroy({
        where: {
          id_customer: id
        }
      })

      res.status(200).json({
        msg: 'compra finalizada com sucesso',
        data: compra
      })
    } catch (error) {
       res.status(500).json({
        msg: "ocorreu um erro seu bosta",
        err: error.message
       })
    }

  },

  async listarCompra(req, res) {

  },

  async cancelarCompra(req, res) {
    //caso o cliente desista da compra nesse estágio ele deve ser cancelado e apagado da tabela purchase
  },
};
