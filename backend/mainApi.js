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
//controller de clientes 
const clients = require('./Controllers/user/custController');
//controller de carrinho
const cart = require('./Controllers/cart/CartController');

//rota para CRUD para usuários
api.post('/CreateUser', users.createUser);

// rota para logar usuário
api.post("/login", users.loginUser);



//Rotas CRUD para produtos

// rota para criar categoria
api.post('/createCat', categories.createCategory);

// rota para listar todas as categorias
api.get('/listCategory', categories.ListCategory);

// rota para criar produtos
api.post('/createProduct', products.createProducts);
// rota para listar todos os produtos
api.get("/listAll", products.ListProducts);

//rota para listar produtos por suas categorias
api.get('/ListByCat/:id/product', products.listByCategory)

// rota para editar produtos
api.post('/edit/:id/product', products.editProduct);
// rota para deletar produtos
api.post('/delete/:id/product', products.deleteProducts);



// rota de CRUD de clientes

//criar cliente
api.post('/createClient', clients.createCust);
//listar todos os clientes
api.get('/listAllClients', clients.listAllClients);
//rota de editar clientes
api.post('/edit/:id/Client', clients.editCust);

// rota para carrinho de compras dos usuários

//adicionar itens ao carrinho
api.post('/createCart', cart.addToCart)

//rota para listar o carrinho com base no id do cliente
api.get('/getCart/:id/customer', cart.ListCart);

// porta do servidor
let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`));
});


