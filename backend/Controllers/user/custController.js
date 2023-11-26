const db = require('../../db/models/index');
module.exports = {
    async createCust(req, res) {
        const { custname, email, cpf } = req.body;
        const { filename } = req.file;
        try {
            const Image = await db.imagens.create({
                nome: filename
            });

            const newCostumer = await db.customers.create({
                custname: custname,
                email: email,
                cpf: cpf,
                id_imagem: Image.id
            });

            res.status(200).json({
                msg: 'Cliente cadastrado com sucesso',
                newCostumer
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    },

    listAllClients(req, res) {
        db.customers.findAll({
            include: [
                {
                    model: db.imagens,
                    attributes: [
                        'nome',
                        [
                            db.sequelize.fn("concat", process.env.URL + "/CustImage/", db.sequelize.col('nome')), 'nome'
                        ]
                    ]
                }
            ]

        }).then((custs) => {
            res.status(200).json({
                data: custs
            });
        }).catch((err) => {
            res.json({
                msg: 'produtos não encontrados',
                erro: err
            })
        });
    },

    deleteCust(req, res) {
        let { id } = req.params;
        try {
            const deletedUser = db.customers.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).json({
                msg: "usuario deletado",
                deletedUser
            })
        } catch (error) {
            if (res.statusCode == 400) {
                res.json({
                    msg: 'erro de usuário',
                    error: error
                });

            } else if (res.statusCode == 500) {
                res.json({
                    msg: 'Erro no servidor',
                    error: error
                });
            }
        }
    },

    async editCust(req, res) {
        let { id } = req.params;
        const { custname, email, cpf } = req.body;
        db.customers.update({
            custname: custname,
            email: email,
            cpf: cpf,
            where: {
                id: id
            }
        })
    }
}