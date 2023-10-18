export const columns = [
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
        field: row => row.name,
        label: 'Nome',
        align: 'center',
        width: '150px',
        require: true
    },
    {
        name: 'quantidade',
        field: row => row.quantidade,
        label: 'Quantidade',
        align:'center',
        width: '100px',
        require: true
    },
    {
        name: 'subtotal',
        field: row => row.subtotal,
        label: 'SubTotal',
        align: 'center',
        width: '100px',
        require: true
    }
]


