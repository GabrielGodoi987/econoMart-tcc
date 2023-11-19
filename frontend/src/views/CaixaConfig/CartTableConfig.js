export const columns = [
    {
        name: 'id',
        field: row => row.Product.id,
        label: 'Id',
        align: "center",
        width: "100px",
        require: true,
    },
    {
        name: 'nome',
        field: row => row.Product.productname,
        label: 'Nome',
        align: 'center',
        width: '150px',
        require: true
    },
    {
        name: 'quantidade',
        field: row => row.quantity,
        label: 'Quantidade',
        align:'center',
        width: '100px',
        require: true
    },
    {
        name: 'subtotal',
        field: row => row.price,
        label: 'SubTotal',
        align: 'center',
        width: '100px',
        require: true
    },
    {
        name: 'image',
        field: row => row.id_imagem.imagen.nome,
        label: 'Imagem',
        align: 'center',
        width: '200px',
        require: true,

    }
]


