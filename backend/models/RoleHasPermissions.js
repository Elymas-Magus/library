const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Permissions = require('./Permissions');
const Roles = require('./Roles');

const RoleHasPermissions = db.define('role_has_permissions', {
    roleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    permissionId: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    }
});

Roles.hasMany(RoleHasPermissions, { foreignKey: 'roleId' });
Permissions.hasMany(RoleHasPermissions, { foreignKey: 'permissionId' })

module.exports = RoleHasPermissions;