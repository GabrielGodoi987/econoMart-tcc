export const columns = [
    {
        name: 'foto',
        field: row => row.foto,
        label: '',
        align: 'center',
        require: true
    },
    {
        name: 'Nome',
        field: row => row.sellername,
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
        name: 'senha',
        field: row => row.password,
        label: 'Senha',
        width: '100px',
        align: 'center',
        require: true
    }
]