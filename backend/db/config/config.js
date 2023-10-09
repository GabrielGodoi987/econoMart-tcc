let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
require('dotenv').config();
module.exports = {
    development: {
      //HOST DO BANCO DE DADOS ONLINE
      host: PGHOST,
      // DATABASE QUE ESTAMOS UTILIZANDO
      database: PGDATABASE,
      //MEU USUÁRIO DO BANCO DE DADOS
      username: PGUSER,
      password: PGPASSWORD,
      //A PORTA QUE ESTÁ SENDO UTILIZADA NO BANCO DE DADOS
      port: 5432,
      ssl: 'require',
      //TIPO DE BANCO DE DADOS SENDO UTILIZADO
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Adicione esta linha para evitar erros de certificado não confiável (use apenas para desenvolvimento)
        }
      },
      //IMPORTANTE PARA A CONEXÃO DO BANCO DE DADOS
      connection: {
        options: `project=${ENDPOINT_ID}`,
      },
    }
  }