const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./Users');

const LivroAutor = db.define('book_authors', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    activated: {
        type: DataTypes.BOOLEAN,
        require: true,
    },
    createdBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
}, { paranoid: true });

User.hasOne(LivroAutor, { foreignKey: 'createdBy' });

module.exports = LivroAutor;