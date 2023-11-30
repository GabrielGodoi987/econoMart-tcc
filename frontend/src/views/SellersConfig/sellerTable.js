export const columns = [
    {
        name: 'Nome',
        field: row => row.custname,
        label: 'Nome',
        align: 'center',
        width: '120px',
        require: true
    },
    {
        name: 'Email',
        field: row => row.email,
        label: 'Email',
        align: 'center',
        width: '250px',
        require: true
    },
    {
        name: 'cpf',
        field: row => row.cpf,
        label: 'CPF',
        width: '100px',
        align: 'center',
        require: true
    },
]