const Permissions = require("../models/Permissions")
const RoleHasPermissions = require("../models/RoleHasPermissions")

module.exports = class Controller {
    static async validate(req, permission) {
        const hasPermissions = RoleHasPermissions.findOne({
            where: { roleId: req.user.roleId },
            include: [{
                model: Permissions,
                where: { permission },
            }]
        });
        
        return hasPermissions != undefined &&
            hasPermissions != null;
    }
}