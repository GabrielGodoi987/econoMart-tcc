const db = require('../db/models/index');

module.exports = {
    createUser(req, res) {
        try {
            const user = db.Usuarios.create({
                Nome_Usuario: req.body.Nome_Usuario,
                Senha: req.body.Senha,
                updatedAt: Date.now(),
                createdAt: Date.now()
            })
            res.status(201).send(
                {
                    message: 'Cadastro realizado com sucesso!',
                    user

                }
            );
        } catch (error) {
            if (res.statusCode == 500) {
                res.json({
                    message: "erro de servidor"
                })
            } else if (res.statusCode == 400) {
                res.json({
                    message: 'erro de usuário'
                })
            }
        }
    },
    updateUser(req, res) {

    },
    authenticateUser(req, res) {

    },
    deleteUser(req, res) {

    }
}