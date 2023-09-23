const db = require('../db/models/index');
const chalk = require('chalk');
module.exports = {
     createCategory(req, res) {
        try {
            const send = req.body;
            if (req.body != "") {
                const categoriCreate = db.Categoria.create({
                    
                    nomeCategoria: send.nomeCategoria
                });

                res.status(200).json({
                    msg: 'Cadastro realizado com sucesso',
                    send: categoriCreate
                })
            } else {
                res.status(404).json({
                    msg: 'Campos vazios não permitem o cadastro da categoria, por favor insira os campos necessário',
                    error: (error) => {
                        console.log(chalk.black.bgWhite(error));
                    }
                })
            }
        } catch (error) {
            if (res.statuscode == 400) {
                res.json({
                    msg: 'Talvez você tenha feito algo errado, por favor refaça o envio e prete atenção nos campos'
                })
            } else if (res.statuscode == 500) {
                res.json({
                    msg: 'Estamos tendo problemas no nosso servidor por favor tente novamente mais tarde!!'
                })
            }
        }

    }
}