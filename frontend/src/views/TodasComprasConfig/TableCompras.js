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
        field: row => row.Product.map(p => p.Product).join(', ') || '',
        label: 'Produtos comprados'
    },
    {
        name: 'Quantidade',
        field: row => row.itensCarrinho.quantitdade,
        label: 'Quantidade'
    },
    {
        name: 'Valor Total',
        field: row => row.itensCarrinho.preco,
        label: 'Valor total da compra'
    }

]
