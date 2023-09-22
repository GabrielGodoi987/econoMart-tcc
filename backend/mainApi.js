// framework principal do backend para rodar javaScript
const express = require('express');

// apenas para aparecer um console colorido e mais fácil de visualizar
const chalk = require('chalk');

//chamando a configuração do upload de imagens 
const upload = require('./uploadImages');

// chamar o banco de dados
const bd = require('./bd/models/index')

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


// rota para criar clientes
api.post('/ClienteRegistes', (req, res) => {
    const createUser = bd.Clientes.create({

    })
})

// rota que listará todos os clientes existentes no banco e renderiza no front end
api.get('/AllClientes', (req, res) => {
    const findClientes = bd.Clientes.findAll({
        attributes: ['nome_cliente', 'endereco', 'telefone', 'email']
    });

    try{
        res.status(200).json({
            error: false,
            message: 'usuários existentes e econtrados com sucesso',
            clientes: findClientes
        })
    }catch(error){
        if(res.statusCode == 400){
            res.json({
                error: true,
                message: 'erro de usuário, provavelmente você cometeu um erro'
            })
        }else if(res.statusCode == 500){
            res.json({
                error: true,
                message: 'estamos enfrentando por favor tente novamente'
            })
        }
    }
})


// porta do servidor
let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`))
})

