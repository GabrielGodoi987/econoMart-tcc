const db = require("../../db/models/index");

module.exports = {
    async createCategory(req, res) {
        const { CategoryName } = req.body
        try {
            const categorycreate = db.Category.create({
                CategoryName: CategoryName
            });
            res.status(200).json({
                msg: 'categoria cadastrada com sucesso',
                category: categorycreate.CategoryName
            });
        } catch (error) {
            if (res.statusCode == 400) {
                // Erros de validação, por exemplo, campos obrigatórios ausentes
                res.status(400).json({
                    msg: "Erro ao criar nova categoria",
                    errors: error
                });
            } else if(res.statusCode == 500){
                // Outros tipos de erros, como erros de banco de dados
                res.status(500).json({
                    msg: "Ocorreu um erro no servidor",
                    error: error
                });
            }
        }
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