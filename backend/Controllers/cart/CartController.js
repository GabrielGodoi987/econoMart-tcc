const db = require("../../db/models/index");

// const { op } = require("sequelize");

module.exports = {
  async adToCart(req, res) {
    //com base no id do usuário adicionar dados ao carrinho com o id do usuário
    const { id_customer, idproduct, quantity } = req.body;
    try {
      const custid = await db.customers.findByPk(id_customer);
      const productid = await db.Products.findByPk(idproduct);
      if (!custid) {
        res.status(500).json({
          msg: "o usuário não foi encontrado",
          erro: true,
        });
      }

      if (!productid) {
        res.status(500).json({
          msg: "produto não encontrado",
          erro: true,
        });
      }

      if (productid.quantity >= quantity) {
       const updatestock = await db.Products.update(
          {
            stock: productid.stock - quantity,
          },
          {
            where: {
              id: idproduct,
            },
          }
        );

        res.json({
            msg: `estoque atualizado`,
            data: updatestock
        })
      } else if (productid.quantity < quantity) {
        res.status(400).json({
          msg: "a quantidade escolhida é maior que a em estoque, atualize o estoque de produtos",
          erro: true,
        });
      }
      const createCart = await db.CartItems.create({
        id_product: productid,
        id_customer: custid,
        quantity: quantity,
      });

      res.status(200).json({
        msg: "carrinho criado com sucesso",
        erro: false,
        data: createCart,
      });
    } catch (error) {
      res.json({
        msg: "ocorreu um erro",
        erro: error,
      });
    }
  },

  async DeleteitemsCart(req, res) {
    //caso ele desista ele pode apagar produtos do seu carrinho
    const { userid } = req.params.id;
  },
};
