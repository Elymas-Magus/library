const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./Users');

const LivroEditora = db.define('book_publishers', {
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

User.hasOne(LivroEditora, { foreignKey: 'createdBy' });

module.exports = LivroEditora;