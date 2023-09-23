const db = require('../db/models/index')

module.exports = {
    CreateUser(req, res) {
        let cliente = req.body
        const createUser = db.Clientes.create({
            nome: cliente.nome,
            endereco: cliente.endereco,
            telefone: cliente.telefone,
            email: cliente.email,
            createdAt: Date.now(),
            updatedAt: Date.now()
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

    ListUser(req, res) {
        const AllClientes = db.Clientes.findAll({
            attributres: ['name', 'email', 'endereco']
        });

        try {
            res.status(200).json({
                error: false,
                AllClientes
            })
        } catch (error) {
            res.status(400 || 500).json({
                msg: 'algo deu errado por favor veja se você não cometeu um erro, caso contrário, perdoe nossos erros de rede, estamos dando o máximo para arrumar',
                error: true
            })
        }
    }
}