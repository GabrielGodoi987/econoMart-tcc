// framework principal do backend para rodar javaScript
const express = require('express');

// apenas para aparecer um console colorido e mais fácil de visualizar
const chalk = require('chalk');

//chamando a configuração do upload de imagens 
const upload = require('./uploadImages');

// chamar o banco de dados
const bd = require('./db/models/index');

//cors
const cors = require('cors');
const api = express()

api.use(express.json());
api.use(cors());


//controller de produtos
const products = require("./Controllers/products/ProductsController");
//controller de categorias
const categories = require("./Controllers/products/Categories");
//controller de usuarios
const users = require('./Controllers/user/UsersController');


//rota para CRUD para usuários
api.post('/CreateUser', users.createUser);


//Rotas CRUD para produtos

// rota para criar categoria
api.post('/createCat', categories.createCategory);

// rota para criar produtos
api.post('/createProduct', products.createProducts);

// rota para listar produtos

// porta do servidor
let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`));
});

