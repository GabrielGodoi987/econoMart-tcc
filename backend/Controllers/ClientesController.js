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
            attributes: ['nome', 'email', 'endereco']
        });

        try {
            res.status(200).json({
                error: false,
                AllClientes
            })
        } catch (error) {
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