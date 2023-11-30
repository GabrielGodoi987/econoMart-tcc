export const columns = [
    {
        name: 'nome',
        field: row => row.customer.custname,
        label: 'nome',
        require: true
    },
    {
        name: 'email',
        field: row => row.customer.email,
        label: 'e-mail'
    },
    {
        name: 'Produtos',
        field: row => row.Product.productname,
        label: 'Produtos comprados'
    },
    {
        name: 'Quantidade',
        field: row => row.itensCarrinho.quantidade,
        label: 'Quantidade'
    },
    {
        name: 'Valor Total',
        field: row => row.itensCarrinho.preco,
        label: 'Valor total da compra'
    }
]
