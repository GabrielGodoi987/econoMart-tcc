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
        include: [db.Products]
      });

      let totalPrice = 0;

      // Criando um array com os dados dos itens do carrinho para criar um único registro
      const itemsData = cartItems.map(cartItem => ({
        id_product: cartItem.Product.id,
        quantidade: cartItem.quantity,
        preco: cartItem.price,
      }));

      // Criando um único registro de itensCarrinho para todos os itens do carrinho
      const createdItems = await db.itensCarrinho.bulkCreate(itemsData);

       await db.itensCarrinho.create({
        id_product: itemsData.Product.id,
      });
      // Calculando o preço total da compra somando os preços de todos os itens
      totalPrice = cartItems.reduce((total, cartItem) => total + cartItem.price, 0);

      // Criando a compra após a criação dos itens
      const novaCompra = await db.purchase.create({
        id_customer: id,
        totalPrice: totalPrice,
        purchaseDate: new Date()
      });
      // Associando os itens criados à compra
      await novaCompra.set(createdItems);


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
        include: [
          {
            model: db.itensCarrinho,
          },
          {
            model: db.customers,
            attributes: ['custname', 'id_imagem', 'email'],
            include: [
              {
                model: db.imagens,
                attributes: [
                  [
                    db.sequelize.fn("concat", process.env.URL + "/CustImage/", db.sequelize.col('nome')), 'imagem_nome'
                  ]
                ]
              }
            ]
          },
          {
            model: db.Products,
            attributes: ["productname", "price", "validade", "id_category"],
            include: [
              {
                model: db.Category,
              }
            ]
          }
        ]

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
