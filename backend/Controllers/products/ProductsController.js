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
                validade: new Date(validade)
            })
            res.status(200).json({
                msg: 'produto cadastrado com sucesso',
                product
            })

        } catch (error) {
            if (res.statusCode == 400) {
                res.json({
                    msg: "Erro ao criar o produto",
                    erros: true + error
                });
            } else if (res.statusCode == 500) {
                res.json({
                    msg: "Ocorreu um erro no servidor",
                    error: true + error
                });
            }
        }
    },

    ListProducts(req, res) {
        db.Products.findAll({
            include: [
                {
                    model: db.Categories,
                    attributes: ['id_category']
                }
            ]
        }).then((ListProducts) => {
            return res.status(200).json({
                msg: 'produtos encontrados, caso não tenha nenhum cadastre-os',
                products: ListProducts
            })
        }).catch((error) => {
            if (res.statusCode == 400) {
                res.json({
                    msg: "Erro ao buscar produtos",
                    erros: true + error
                });
            } else if (res.statusCode == 500) {
                res.json({
                    msg: "Ocorreu um erro no servidor",
                    error: true + error
                });
            }
        })
    },

    async deleteProducts(req, res) {
        let idProduct = req.params.id;
        const product = db.Products.findByPk(idProduct);

        await db.Products.destroy(product).then((deletedProduct) => {
            res.status(200).json({
                msg: `Produto ${product.productname} deletado com sucesso!`,
                product: deletedProduct
            })
        }).catch((err) => {
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
            }
        })

    },
    async editProduct(req, res) {
        let idProduct = req.body.id;
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
                    id: idProduct // A condição para identificar o produto que deve ser atualizado
                }
            }
        ).then(() => {
            res.status(201).send('Produto atualizado com sucesso');
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao atualizar o produto'); // Trate o erro de forma apropriada
        });
    }
} 