const db = require("../../db/models/index");

module.exports = {
    async createCategory(req, res) {
        const { catName } = req.body
        await db.category.create({
            CategoryName: catName
        }).then((productCreated) => {
            res.status(200).json({
                msg: 'categoria cadastada com sucesso',
                product: productCreated
            });
        }).catch((error) => {
            if (res.statusCode == 400) {
                res.json({
                    msg: "Erro ao criar nova categoria",
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

    ListCategory(req, res) {
        db.category.findAll().then((catName) => {
            return res.status(200).json({
                msg: 'produtos encontrados, caso não tenha nenhum cadastre-os',
                category: catName
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


    deleteCategory() {

    },

    updateCategory() {

    }
}