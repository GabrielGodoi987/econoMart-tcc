const express = require('express');
const chalk = require('chalk');
const upload = require('./uploadImages');

const api = express()

api.use(express.json());


api.post('/imagensUpload', upload.save.single('Image'), (req, res) => {
    try {
        res.status(200).json({
            message: 'Imagem baixada com sucesso',
            error: 'false',
            file: req.file.filename
        })
    } catch (error) {
        if (res.statusCode == 400) {
            res.json({
                message: 'insira um tipo de imagem correto, erro de usuário',
                error: true
            })
        } else if (res.statusCode == 500) {
            res.json({
                message: 'erro do servidor, por favor tente novamente mais tarde',
                error: true
            })
        }
    }
})

let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`))
})