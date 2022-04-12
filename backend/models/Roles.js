const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Roles = db.define('roles', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
});

module.exports = Roles;