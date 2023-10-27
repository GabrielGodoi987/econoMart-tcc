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

      if (!productid || !custid) {
        res.status(500).json({
          msg: "produto não encontrado ou cliente não encontrado",
          erro: true,
        });
      }

      if (productid.quantity >= quantity) {
        //atualizando estoque da tabela produtos
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
        price: quantity * custid.price
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
  
// abaixo o controller para listar todos os produtos do carrinho 
  async ListCart(req, res) {
    const { idCustomer } = req.body;
    try {
      const cart = await db.CartItems.findAll({
        where: {
          id_customer: idCustomer
        },
        include: {
          model: db.Products,
        }
      })

      if (cart.length === 0) {
        return res.status(401).json({
          msg: 'Não há itens no carrinho',
          erro: true
        })
      } else {
        res.status(200).json({
          msg: `produtos do cliente ${idCustomer} encontrados`,
          data: cart
        })
      }


    } catch (error) {
      res.json({
        msg: 'ocorreu um erro',
        erro: error
      })
    }
  },

  async DeleteitemsCart(req, res) {
    //caso ele desista ele pode apagar produtos do seu carrinho
    const { userid } = req.params.id;
  },
};
