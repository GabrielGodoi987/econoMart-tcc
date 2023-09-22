const db = require('../db/models/index')

module.exports = {
    CreateUser(req, res) {
        let cliente = req.body
        if (req.body != "") {
            const createUser = db.Clientes.create({
                nome: cliente.nome,
                endereco: cliente.endereco,
                telefone: cliente.telefone,
                email: cliente.email,
                dataRegistro: Date.now()
            })
        } else {
            res.json({
                msg: 'precisamos adicionar todos os atributos para que o cadastro funcione'
            })
        }

        try {
            res.status(200).json({
                msg: 'salvo com sucesso',
                cliente: cliente
            })
        } catch (error) {
            res.status(400 || 500).json({
                masg: 'algo deu errado'
            })
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