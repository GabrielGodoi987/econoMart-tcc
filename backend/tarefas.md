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




o que a tabela Categoria Precisa:
[
  { "nomeCategoria": "Alimentos Secos" },
  { "nomeCategoria": "Laticínios" },
  { "nomeCategoria": "Carnes e Aves" },
  { "nomeCategoria": "Produtos de Padaria" },
  { "nomeCategoria": "Frutas e Vegetais" },
  { "nomeCategoria": "Congelados" },
  { "nomeCategoria": "Bebidas" },
  { "nomeCategoria": "Produtos de Higiene Pessoal" },
  { "nomeCategoria": "Produtos de Limpeza Doméstica" },
  { "nomeCategoria": "Produtos para Animais de Estimação" },
  { "nomeCategoria": "Produtos de Cuidados Infantis" },
  { "nomeCategoria": "Produtos de Higiene Feminina" },
  { "nomeCategoria": "Cereais Matinais e Lanches" },
  { "nomeCategoria": "Produtos de Panificação" },
  { "nomeCategoria": "Eletrodomésticos e Utensílios de Cozinha" },
  { "nomeCategoria": "Produtos de Beleza" }
]
estas são todas as categorias que precisamos