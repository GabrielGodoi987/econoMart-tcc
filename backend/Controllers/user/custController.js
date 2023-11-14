const db = require('../../db/models/index');
module.exports = {
    async createCust(req, res) {
        const { custname, email, cpf } = req.body;
        const { filename } = req.file;
        try {
            const Image = db.imagens.create({
                nome: filename
            });

            // const newCostumer =  db.customers.create({
            //     custname: custname,
            //     email: email,
            //     cpf: cpf,
            //     id_imagem: Image.id
            // });

            res.status(200).json({
                msg: 'usuário criado com sucesso',
                // newCostumer,
                data: Image
            })

        } catch (error) {
            if (res.statusCode == 400) {
                res.json({
                    msg: 'erro de usuário',
                    error: error
                })
            } else if (res.statusCode == 500) {
                res.json({
                    msg: 'Erro no servidor',
                    error: error
                })
            }
        }
    },

    listAllClients(req, res) {
        db.customers.findAll({
            attributes: [
                'custname',
                'email',
                'cpf',
                [db.sequelize.fn('concat', '/src/images/', db.sequelize.col('nome_da_coluna_da_imagem')), 'imagem']
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
        let client = req.params.id;
        db.clients.destroy({
            where: {
                id_customer: client
            }
        }).then((deltedCli) => {
            res.status(200).json({
                msg: `cliente ${deltedCli.custname} deletado com sucesso`,
                data: deltedCli
            });
        }).catch((error) => {
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
        })
    },

    async editCust(req, res) {
        let client = req.params.id;
        const { custname, email, cpf } = req.body;
        db.customers.update({
            custname: custname,
            email: email,
            cpf: cpf,
            where: {
                id_customer: client
            }
        })
    },

    async deletecust(req, res) {
        const { custID } = req.params.id
        try {
            const delteIt = await db.clients.destroy({
                where: {
                    id_customer: custID
                }
            })

            res.status(200).json({
                msg: `cliente ${custID} deletado com sucesso`,
                data: delteIt
            })
        } catch (erro) {
            if (res.statusCode == 500) {
                return res.send('Ocorreu um erro no servidor')
            } else if (res.statusCode == 400) {
                return res.send(`Não foi possivel excluir o cliente`)
            }
        }

    }
}