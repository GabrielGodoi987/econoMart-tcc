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
        name: 'send',
        field: '',
        label: 'send',
        align: 'center',
        require: true
    }
]


export { columns }