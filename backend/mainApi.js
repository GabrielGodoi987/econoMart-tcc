// framework principal do backend para rodar javaScript
const express = require('express');

// apenas para aparecer um console colorido e mais fácil de visualizar
const chalk = require('chalk');

//chamando a configuração do upload de imagens 
const upload = require('./uploadImages');

// chamar o banco de dados
const bd = require('./db/models/index');


//chamando controllers que vão fazer as ações para cada tabela
const Products = require('./Controllers/ProductsController');

const api = express()

api.use(express.json());


//rota de upload de imagens
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

//rota para criar clientes
api.post('/CreateProducts', )

//Rota para listar todos os produtos
api.get('/AllProducts', (req, res) => {

})


// porta do servidor
let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`))
})

