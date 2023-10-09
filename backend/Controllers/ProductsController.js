const db = require('../db/models/index');

module.exports = {
     createProducts(req, res) {
          //cria produtos de acordo com os campos definidos no modelo
          const produtos = req.body;
          const createProduct = db.Produtos.create({
               nome: produtos.nome,
               descricao: produtos.descricao,
               preco: produtos.preco,
               Qtd_estoque: produtos.Qtd_estoque,
               IdCategoria: produtos.IdCategoria,
               Validade: new Date(req.body.Validade),
               Fabricacao: new Date(req.body.Fabricacao)
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
               //incluir o nome da categoria de acordo com o id da mesma definido na requisição
               include: [{
                    //buscando dos modelos exportados o model categoria
                    model: db.categoria,
                    //o atributo que desejamos retornar
                    attributes: ['nomeCategoria']
               }]
          }).then((AllProducts) => {
               res.status(200).json({
                    AllProducts: AllProducts
               });

          }).catch((error) => {
               //tratativa de erros para erros de usuários e de servidor
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
     async selectOne(req, res) {
          try {
               const productId = req.params.id;
               //procurar o produto por seu id
               const product = await db.Produtos.findByPk(productId);
               //caso o produto seja encontrado deverá ser retornado os seus valores
               //porém após isso vamos deletar esse produto
               if (product) {
                    res.status(200).json({
                         msg: `Produto ${productId} encontrado`,
                         product
                    });
               } else {
                    //caso o produto não seja encontrado e o servidor estiver no ar, então apenas retornaremos os erros de usuários
                    res.status(404).json({
                         msg: "Produto não encontrado",
                         error: true
                    });
               }
          } catch (error) {
               console.error(error);
               res.status(500).json({
                    msg: "Problemas de servidor, por favor, tente novamente",
                    error: true
               });
          }
     },

     async deleProducts(req, res) {
          try {
               let idProduct = req.params.id;
               //procurar o produto por seu id
               const product = await db.Produtos.findByPk(idProduct);
               //caso o produto seja encontrado deverá ser retornado os seus valores
               //porém após isso vamos deletar esse produto
               if (product) {
                    res.status(200).json({
                         msg: `Produto ${idProduct} encontrado`,
                         product
                    });
               } else {
                    //caso o produto não seja encontrado e o servidor estiver no ar, então apenas retornaremos os erros de usuários
                    res.status(404).json({
                         msg: "Produto não encontrado",
                         error: true
                    });
               }
          } catch (error) {
               console.error(error);
               res.status(500).json({
                    msg: "Problemas de servidor, por favor, tente novamente",
                    error: true
               });
          }

     }
}

/* 
colunas que precisamos
 id
 nome 
 descricao
 categoria
 Qtd_estoque
 preco


*/