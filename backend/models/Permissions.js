const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Permissions = db.define('permissions', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
});

module.exports = Permissions;