const db = require('../db/models/index');
const chalk = require('chalk');
module.exports = {
    createCategory(req, res) {
        try {
            //recebe o corpo da requisição ou o que o usuário digitar para ser mais específico
            const send = req.body;
            //caso a requisição venha vazia será cadastrado os campos
            if (req.body != "") {
                const categoriCreate = db.categoria.create({
                    nomeCategoria: send.nomeCategoria
                });
                //resposta com faixa de resposta 200, que significa ok, ou seja, a promise foi respondida com sucesso
                res.status(200).json({
                    msg: 'Cadastro realizado com sucesso',
                    send: categoriCreate
                })
            } else {
                //caso os campos estejam vazios será enviado esta resposta com o erro de usuário
                res.status(404).json({
                    msg: 'Campos vazios não permitem o cadastro da categoria, por favor insira os campos necessário',
                    error: (error) => {
                        console.log(chalk.black.bgWhite(error));
                    }
                })
            }
        } catch (error) {
            //tratativas de erros para erros de usuários ou de servidor
            if (res.statusCode == 400) {
                res.json({
                    msg: 'Talvez você tenha feito algo errado, por favor refaça o envio e prete atenção nos campos'
                })
            } else if (res.statusCode == 500) {
                res.json({
                    msg: 'Estamos tendo problemas no nosso servidor por favor tente novamente mais tarde!!'
                })
            }
        }

    },

    ListCategori(req, res) {
        db.categoria.findAll().then((categorias) => {
            res.status(200).json({
                categoria: categorias
            })
        }).catch((error) => {
            if (res.statusCode == 400) {
                res.json({
                    error,
                    msg: 'erro de usuário'
                })
            } else if (res.statusCode == 500) {
                res.json({
                    error,
                    msg: 'erro de servidor'
                })
            }
        })
    }
}