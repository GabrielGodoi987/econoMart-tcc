let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
require('dotenv').config();
module.exports = {
    development: {
      host: PGHOST,
      database: PGDATABASE,
      username: PGUSER,
      password: PGPASSWORD,
      port: 5432,
      ssl: 'require',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Adicione esta linha para evitar erros de certificado não confiável (use apenas para desenvolvimento)
        }
      },
      connection: {
        options: `project=${ENDPOINT_ID}`,
      },
    }
  }