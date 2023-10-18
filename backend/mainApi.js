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


//chamando controllers que vão fazer as ações para cada tabela
const Products = require('./Controllers/ProductsController');
const categoria = require('./Controllers/CategoriaController');
const Clientes = require('./Controllers/ClientesController');
const user = require('./Controllers/UsersController');
const cart = require('./Controllers/CartController');

const api = express()

api.use(express.json());
api.use(cors());

/*======================= rota para tratar chamadas a api de clientes ============================================ */

//rota para criar clientes
api.post('/CreateCustomers', Clientes.CreateCustomer);

//Rota para listar todos os Clientes
api.get('/AllCustomers', Clientes.ListCostumer);

/*========================= fim da rota clientes ==================================================================*/

/* ============================= rotas para a tabela produtos e categoria ======================================== */


//criar categoria de alimentos e bebidas
api.post('/CreateCategoria', categoria.createCategory);
api.get('/ListCategoria', categoria.ListCategori);

//Criar ou cadastrar produtos
api.post('/ProductsRegister',  upload.save.single('Image'), Products.createProducts);

//Listar todos os Produtos
api.get('/AllProducts', Products.listProducts);

api.post('/AllProducts/:id/edit', Products.selectOne);

// ROTA PARA DELETAR PRODUTO -> CARREGA O PARAMETRO ID, POIS ELE SERÁ O ID PARAMETRO QUE ESTAMOS ENVIANDO
api.post('/AllProducts/:id/delete', Products.deleProducts)



/* ============================================================ rotas para usuários ==================================================== */

api.post('/UserCreate', user.createUser);



/* ==================================================================================================================================== */


/* ========================================  Rota para Cart  ========================================================================== */

api.post('/createCart', cart.CreateCart);



/*Rota para a criação de vendedores e suas operações */






// porta do servidor
let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`));
});

