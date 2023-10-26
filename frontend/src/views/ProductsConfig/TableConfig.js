// productname: DataTypes.STRING,
// description: DataTypes.STRING,
// stock: DataTypes.INTEGER,
// price: DataTypes.FLOAT,
// validade: DataTypes.DATE

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
        field: row => row.productname,
        label: 'Nome do Produto',
        align: 'center',
        width: '200px',
        require: true
    },
    {
        name: 'descricao',
        field: row => row.description,
        label: 'descrição do Produto',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name:  'stock',
        field: row => row.stock,
        label: 'Em estoque',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'preco',
        field: row => row.price,
        label: 'Valor',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'nomeCategoria',
        field: row => row.Category.CategoryName,
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