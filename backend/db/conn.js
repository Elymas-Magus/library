const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
    }
)

try {
    sequelize.authenticate();
    console.log('Conectamos com sucesso!');
} catch (error) {
    console.error('Não foi possível conectar: ' + error);
}

module.exports = sequelize;