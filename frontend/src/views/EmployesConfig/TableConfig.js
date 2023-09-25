const columns = [
    {
        //nome da coluna
        name: 'Nome',
        //campo da coluna
        field: 'Nome',
        //label que aparecerá na página
        label: 'Nome',
        //alinhamento da legenda(label) que aparecerá na tela
        align: 'center',
        //largura da coluna 
        width: '100px',
        //pergunta se é um campo obrigatório
        require: true
    },
    {
        name: 'email',
        field: 'email',
        label: 'E-mail',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'telefone',
        field: 'telefone',
        label: 'Telefone',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'funcao',
        field: 'funcao',
        label: 'Função',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'salario',
        field: 'salario',
        label: 'Salário',
        align: 'center',
        width: '100px',
        require: true
    }
]



export { columns }