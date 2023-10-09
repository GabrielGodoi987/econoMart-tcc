const columns = [
    {
        name: 'id',
        field: row => row.id,
        label: 'Id',
        align: "center",
        width: "100px",
        require: true,
    },
    {
        name: 'nome',
        field: 'nome',
        label: 'Nome do Produto',
        align: 'center',
        width: '200px',
        require: true
    },
    {
        name: 'descricao',
        field: 'descricao',
        label: 'descrição do Produto',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'Qtd_estoque',
        field: 'Qtd_estoque',
        label: 'quantidade',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'preco',
        field: 'preco',
        label: 'Valor',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'nomeCategoria',
        field: row => row.categorium.nomeCategoria,
        label: 'Categoria',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'edit',
        field: 'edit',
        label: '',
        align: 'center',
        width: '150px',
        require: true
    }
  
]


export { columns }