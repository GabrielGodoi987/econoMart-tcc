const db = require("../../db/models/index");
module.exports = {
  async addToCart(req, res) {
    const { id_customer, id_product, quantity } = req.body;

    try {
      const cartItems = await db.CartItems.findOne({
        where: {
          id_customer: id_customer
        }
      });

      if (!cartItems) {
        const product = await db.Products.findOne({
          where: {
            id: id_product
          }
        });

        const customer = await db.customers.findOne({
          where: {
            id: id_customer
          }
        });

        if (!product || !customer) {
          return res.status(400).json({
            msg: 'Produto não encontrado ou cliente não encontrado',
            customer: customer,
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
            }
          );
        } else {
          return res.status(400).json({
            msg: 'Estoque insuficiente',
          });
        }

        const createCart = await db.CartItems.create({
          id_product: id_product,
          id_customer: id_customer,
          quantity: quantity,
          price: quantity * product.price
        });

        res.status(200).json({
          msg: 'Item adicionado ao carrinho com sucesso',
          data: createCart
        });
      } else {

        const product = await db.Products.findOne({
          where: {
            id: id_product
          }
        });




        if (product.stock >= quantity) {
          const update = await db.Products.update(
            {
              stock: product.stock - quantity
            },
            {
              where: {
                id: id_product
              }
            }
          );
        } else {
          return res.status(400).json({
            msg: 'Estoque insuficiente',
          });
        }

        
        // Se o carrinho já existir, adicione o novo item ao carrinho existente
        const newItem = await db.CartItems.create({
          id_customer: id_customer,
          id_product: product.id,
          quantity: quantity,
          price: quantity * product.price // Corrigindo a definição de preço
        });

        res.status(200).json({
          msg: 'Item adicionado ao carrinho existente com sucesso',
          data: newItem
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Ocorreu um erro ao adicionar ao carrinho',
        err: error.message
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


    } catch (error) {
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
