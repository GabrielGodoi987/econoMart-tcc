const db = require("../../db/models/index");

// const { op } = require("sequelize");

module.exports = {
  async addToCart(req, res) {
    //com base no id do usuário adicionar dados ao carrinho com o id do usuário
    const { id_customer, id_product, quantity } = req.body;
    try {
      //procuramos o produto para ver se ele realmente existe
      const product = await db.Products.findOne({
        where: {
          id: id_product
        }
      });
      //procuramos o cliente primeiro para ver se ele realmente existe
      const custid = await db.customers.findOne({
        where: {
          id: id_customer
        }
      })


      if (!product || !custid) {
        return res.status(400).json({
          msg: "Produto não encontrado ou cliente não encontrado",
          customer: custid,
          product: product
        });
      }

      if (product.stock >= quantity) {
        const update = await db.Products.update(
          {
            stock: product.stock - quantity
          },
          {
            where: {
              id: id_product
            }
          });
      } else {
        return res.status(400).json({
          msg: 'estoque insuficiente',
          erro: error.message
        })
      }

      const createCart = await db.CartItems.create({
        id_product: id_product,
        id_customer: id_customer,
        quantity: quantity,
        price: quantity * product.price
      });

      res.status(200).json({
        msg: `produtos do cliente ${id_customer} encontrados`,
        data: createCart
      })

      // Restante do seu código...

    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro",
        erro: error.message,
      });
    }

  },


  // abaixo o controller para listar todos os produtos do carrinho 
  async ListCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await db.CartItems.findAll({
        where: {
          id_customer: id
        },
        include: [
          {
            model: db.customers
          },
          {
             model: db.Products
          }
        ]
      })

    if (cart.length === 0) {
      return res.status(401).json({
        msg: 'Não há itens no carrinho',
        erro: error.message
      })
    }

    res.status(200).json({
      msg: `produtos do cliente ${id} encontrados`,
      data: cart
    })


  } catch(error) {
    if (res.statusCode == 500) {
      return res.status(500).json({
        msg: 'ocorreu um erro no servidor',
        erro: error.message
      })
    } else if (res.statusCode == 400) {

      return res.json({
        msg: 'erro de usuário',
        erro: error.message
      })

    } else {
      return res.status(500).json({
        msg: 'ocorreu um erro meu nobre',
        error: error.message
      })
    }
  }
},

  async DeleteitemsCart(req, res) {
  //caso ele desista ele pode apagar produtos do seu carrinho
  const { userid } = req.params.id;
},
};
