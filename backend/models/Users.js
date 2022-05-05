const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Roles = require('./Roles');

const Users = db.define('users', {   
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },  
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    roleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        require: true,
    },
}, { paranoid: true });

Roles.hasMany(Users, { foreignKey: 'roleId' });
Users.belongsTo(Roles);

module.exports = Users;