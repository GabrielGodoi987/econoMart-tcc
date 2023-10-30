const db = require('../../db/models/index');
module.exports = {
    async createProducts(req, res) {
        const { productname, description, price, stock, id_category, validade } = req.body;
        try {
            const product = db.Products.create({
                productname: productname,
                description: description,
                price: price,
                stock: stock,
                id_category: id_category,
                validade: validade
            })
            res.status(200).json({
                msg: 'produto cadastrado com sucesso',
                product
            })

        } catch (error) {
            if (res.statusCode == 400) {
                res.json({
                    msg: "Erro ao criar o produto",
                    erros: error.message
                });
            } else if (res.statusCode == 500) {
                res.json({
                    msg: "Ocorreu um erro no servidor",
                    error: true + error
                });
            }
        }
    },
    async ListProducts(req, res) {
        try {
            const listAll = await db.Products.findAll({
                include: [
                    {
                        model: db.Category,
                        attributes: ['CategoryName']
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
            const listByCat = await db.Products.findAll({
                where: {
                    id_category: id
                },
                include: [
                    {
                        model: db.Category,
                        attributes: ['CategoryName']
                    }
                ]
            });

            return res.status(200).json({
                msg: 'produtos da categoria encontrados',
                data: listByCat
            });
        } catch (error) {
            console.error(error); // Log do erro para ajudar na depuração
            res.status(500).json({
                msg: "Erro ao buscar produtos",
                error: error
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
    }
}









