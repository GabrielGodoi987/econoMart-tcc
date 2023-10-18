const { DATE } = require('sequelize')
const db = require('../db/models/index')

module.exports = {
    CreateCustomer(req, res) {
        let cliente = req.body
        const createUser = db.Clientes.create({
            nome: cliente.nome,
            endereco: cliente.endereco,
            telefone: cliente.telefone,
            email: cliente.email,
        })
        try {
            res.status(200).json({
                msg: 'salvo com sucesso',
                cliente: createUser
            })
        } catch (error) {
            if (res.statusCode == 400) {
                res.json({
                    message: 'error de usuário',
                    error: true
                })
            } else if (res.statusCode == 500) {
                res.json({
                    message: 'erro de servidor',
                    error: true
                })
            }
        }
    },

    ListCostumer(req, res) {
        try {
            const AllClientes = db.Clientes.findAll({
                //retornará apenas os atributos abaixo quando for chamado
                include: {
                    model: db.Cart,
                }
            }).then((AllClientes) => {
                res.status(200).json({
                    error: false,
                    data: AllClientes
                })
            });

            //resposta de sucesso caso ache ou consiga buscar a tabela corrente

        } catch (error) {
            //tratativas de erros para erros de usuário ou de servidor á requisição
            if (res.statusCode == 400) {
                res.json({
                    msg: `erro de usuário olhe ${error}`,
                    error: true
                })
            } else if (res.statusCode == 500) {
                res.json({
                    msg: `erro de servidor ${error}`,
                    error: true
                })
            }
        }
    }
}