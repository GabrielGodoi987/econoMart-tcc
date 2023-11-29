const db = require('../../db/models/index');
require('dotenv').config();
module.exports = {
    async createProducts(req, res) {
        const { productname, description, price, stock, id_category, validade } = req.body;
        const { filename } = req.file;
        try {
            const Image = await db.imagens.create({
                nome: filename,
            });

            const product = await db.Products.create({
                productname: productname,
                description: description,
                price: price,
                stock: stock,
                id_category: id_category,
                validade: validade,
                id_imagem: Image.id
            })
            res.status(200).json({
                msg: 'produto cadastrado com sucesso',
                product
            })

        } catch (error) {
            res.status(500).json({
                msg: "Ocorreu um erro no servidor",
                error: error.message
            })
        };
    },
    async ListProducts(req, res) {
        try {
            const listAll = await db.Products.findAll({
                include: [
                    {
                        model: db.Category,
                        attributes: ['CategoryName']
                    },
                    {
                        model: db.imagens,
                        attributes: [
                            'nome',
                            [
                                db.Sequelize.fn('CONCAT', process.env.URL + "/Images/", db.Sequelize.col("nome")),
                                'nome'
                            ]
                        ]
                    }
                ]
            });

            return res.status(200).json({
                msg: 'produtos encontrados, caso não tenha nenhum cadastre-os',
                products: listAll
            });
        } catch (error) {
            console.error(error); // Log do erro para ajudar na depuração
            res.status(500).json({
                msg: "Erro ao buscar produtos",
                error: error
            });
        }
    },

    async listByCategory(req, res) {
        const { id } = req.params
        try {
            const listByCat = await db.Products.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.Category,
                        attributes: ['CategoryName']
                    },
                    {
                        model: db.imagens,
                        attributes: [
                            'nome',
                            [
                                db.Sequelize.fn('CONCAT', process.env.URL + "/Images/", db.Sequelize.col("nome")),
                                'nome'
                            ]
                        ]
                    }
                ]
            });

            if(!listByCat){
                res.status(400).json({
                    msg: 'Não foi possível localizar o produto solicitado.'
                })
            }

            res.status(200).json({
                msg: 'produtos da categoria encontrados',
                data: listByCat
            });
        } catch (error) {
            console.error(error); // Log do erro para ajudar na depuração
            res.status(500).json({
                msg: "Erro ao buscar produtos",
                error: error.message
            });
        }
    },

    async deleteProducts(req, res) {
        let { id } = req.params;
        try {
            const product = await db.Products.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({
                msg: `Produto deletado com sucesso!`,
                product: product
            })
        } catch (err) {
            if (res.statusCode == 400) {
                res.json({
                    msg: 'produto não encontrado, por favor tente novamente',
                    err: true + err
                })
            } else if (res.statusCode == 500) {
                res.json({
                    msg: 'Ocorreu um erro no servidor',
                    err: true + err
                })
            } else {
                res.json({
                    msg: 'Não foi possível realizar a exclusão',
                    error: err.message
                })
            }
        }
    },

    async editProduct(req, res) {
        let { id } = req.params;
        let { productname, description, stock, price } = req.body

        await db.Products.update(
            {
                productname: productname,
                description: description,
                stock: stock,
                price: price
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.status(201).send('Produto atualizado com sucesso');
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao atualizar o produto');
        });
    },
}

