const fornecedores = [
    labels = {
        name: 'Fornecedores'
    },
    options = [
        {
            id: Math.random() * 10,
            name: 'Fornecedor 1'
        },
        {
            id: Math.random() * 10,
            name: 'Fornecedor 1'
        },
        {
            id: Math.random() * 10,
            name: 'Fornecedor 1'
        },
        {
            id: Math.random() * 10,
            name: 'Fornecedor 1'
        },
        {
            id: Math.random() * 10,
            name: 'Fornecedor 1'
        },
        {
            id: Math.random() * 10,
            name: 'Fornecedor 1'
        },
    ]
]


const teste = fornecedores[1].forEach(element => element);

console.log(teste)