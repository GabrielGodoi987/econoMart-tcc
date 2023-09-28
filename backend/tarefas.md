o que precisamos? 

precisamos de um sistema que controle um supermercado
nesse sistema o usuário deve ser capaz de: 
       - cadastrar novos produtos - tendo cada um deles uma categoria
       - comprar produtos de fornecedors
       - controlar a saida desses produtos
       - cadastrar e controlar as vendas dos vendedores
       - deve ser capaz de enviar mensagens para os vendedores (talvez),
       - cadastrar funcionários com login e id prório
       - cadastrar clientes com login e id próprio para que possamos enviar mensagens e promoções para o mesmo

o gerente deve ser capaz de:
       - coordenar as vendas dos produtos podendo ver o que saí e o que entra
       - ver as vendas realizadas pelos vendedores 
       - acompanhar a compra de produtos por relatórios gerados 
       - (talvez) enviar mensagens para os vendedor com tarefas e coisas do tipo


o sistema deve ter as tabelas:
    produtos,
    categoria,
    promoção,
    itens promoção,
    promoção,

    vendedor,
    vendas,
    itens venda

    fornecedores,
    compras,
    itens compra,

    usuarios,
    clientes,

    transações




insert na tabela produtos


select * from produtos;



delete from produtos where id > 0;

ALTER TABLE produtos AUTO_INCREMENT = 1;


select * from categoria;

SELECT `Produtos`.`id`, `Produtos`.`nome`, `Produtos`.`descricao`, `Produtos`.`Qtd_estoque`, `Produtos`.`preco`, `categorium`.`id` AS `categorium.id`, `categorium`.`nomeCategoria` AS `categorium.nomeCategoria` FROM `Produtos` AS `Produtos` LEFT OUTER JOIN `categoria` AS `categorium` ON `Produtos`.`IdCategoria` = `categorium`.`id`;



-- Inserir o primeiro produto
INSERT INTO produtos (nome, descricao, preco, Qtd_estoque, IdCategoria)
VALUES ('Arroz Camil', 'arroz de 10kg', 8.99, 200, 1);

-- Inserir mais 5 produtos na categoria "alimentos secos" (supondo que a categoria já existe com o ID 1)
-- Você pode alterar os valores como desejar
INSERT INTO produtos (nome, descricao, preco, Qtd_estoque, IdCategoria)
VALUES ('Macarrão', 'macarrão de 500g', 2.99, 150, 1);

INSERT INTO produtos (nome, descricao, preco, Qtd_estoque, IdCategoria)
VALUES ('Feijão', 'feijão carioca', 4.99, 100, 1);

INSERT INTO produtos (nome, descricao, preco, Qtd_estoque, IdCategoria)
VALUES ('Açúcar', 'açúcar refinado', 3.49, 300, 1);

INSERT INTO produtos (nome, descricao, preco, Qtd_estoque, IdCategoria)
VALUES ('Sal', 'sal refinado', 1.99, 250, 1);

INSERT INTO produtos (nome, descricao, preco, Qtd_estoque, IdCategoria)
VALUES ('Farinha de Trigo', 'farinha de trigo comum', 5.99, 80, 1);
