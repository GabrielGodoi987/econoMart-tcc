const db = require('../db/models/index');

module.exports = {
     createProducts(req, res) {
          const produtos = req.body;
          const createProduct = db.Produtos.create({
               nome: produtos.nome,
               descricao: produtos.descricao,
               preco: produtos.preco,
               Qtd_estoque: produtos.Qtd_estoque,
               IdCategoria: produtos.IdCategoria,
          });
          try {
               res.status(200).json({
                    msg: 'produto registrado com sucesso',
                    produto: produtos,
                    teste: createProduct
               })
          } catch (error) {
               if (res.statusCode == 400) {
                    res.json({
                         msg: 'erro de usuário, por favor preste atenção no que você está fazendo',
                         error: error
                    })

               } else if (res.statusCode == 500) {
                    res.json({
                         msg: 'estamos tendo erros no nosso servidor nos desculpe, estamos tentando arrumar esse problema agora',
                         error: error
                    })
               }
          }
     },

     listProducts(req, res) {
          db.Produtos.findAll({
               order: [["nome", "ASC"]],
               include: [{
                    model: db.categoria,
                    attributes: ['nomeCategoria']
               }]
          }).then((AllProducts) => {
               res.status(200).json({
                    AllProducts: AllProducts
               });

          }).catch((error) => {
               if (res.statusCode == 400) {
                    res.json({
                         msg: 'Erro de usuário',
                         error: error
                    });
               } else if (res.statusCode == 500) {
                    res.json({
                         msg: 'Erro de servidor',
                         error: error
                    });
               }
          })


     },
     deleProducts() {

     }
}