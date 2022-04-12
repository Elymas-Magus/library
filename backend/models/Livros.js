const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./Users');
const LivroAutor = require('./LivroAutor');
const LivroEditora = require('./LivroEditora');

const Livros = db.define('books', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        require: true,
    },
    bookAuthorId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        require: true,
    },
    bookPublisherId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        require: true,
    }
});

Livros.belongsTo(User);
User.hasMany(Livros, { foreignKey: 'userId' });

LivroAutor.hasMany(Livros, { foreignKey: 'bookAuthorId' });
Livros.belongsTo(LivroAutor);

LivroEditora.hasMany(Livros, { foreignKey: 'bookPublisherId' });
Livros.belongsTo(LivroEditora);

module.exports = Livros;