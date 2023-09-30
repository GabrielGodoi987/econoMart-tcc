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
const Clientes = require('./Controllers/ClientesController');
const Vendedores = require('./Controllers/SellersController');
const categoria = require('./Controllers/CategoriaController')

const api = express()

api.use(express.json());
api.use(cors());


//rota de upload de imagens
api.post('/imagensUpload', upload.save.single('Image'), (req, res) => {
    try {
        res.status(200).json({
            message: 'Imagem baixada com sucesso',
            error: 'false',
            file: req.file.filename
        });
    } catch (error) {
        if (res.statusCode == 400) {
            res.json({
                message: 'insira um tipo de imagem correto, erro de usuário',
                error: true
            });
        } else if (res.statusCode == 500) {
            res.json({
                message: 'erro do servidor, por favor tente novamente mais tarde',
                error: true
            });
        }
    }
});
/*======================= rota para tratar chamadas a api de clientes ============================================ */

//rota para criar clientes
api.post('/CreateCustomers', Clientes.CreateUser);

//Rota para listar todos os Clientes
api.get('/AllCustomers', Clientes.ListUser);

/*========================= fim da rota clientes ==================================================================*/

/* ============================= rotas para a tabela produtos e categoria ======================================== */


//criar categoria de alimentos e bebidas
api.post('/CreateCategoria', categoria.createCategory);
api.get('/ListCategoria', categoria.ListCategori);

//Criar ou cadastrar produtos
api.post('/ProductsRegister', Products.createProducts);

//Listar todos os Produtos
api.get('/AllProducts', Products.listProducts);

//Deletar Produto
api.post('/AllProducts/:id', Products.deleProducts)



/* ============================================================ rotas para vendedores ==================================================== */

api.get('');



/* ==================================================================================================================================== */




/*Rota para a criação de vendedores e suas operações */






// porta do servidor
let porta = 3333;
api.listen(porta, () => {
    console.log(chalk.black.bgCyan(`servidor online na porta ${porta}`))
})

