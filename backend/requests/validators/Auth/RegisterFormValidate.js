const FormValidate = require('../../FormValidate');

class RegisterFormValidate extends FormValidate {
    static getInstance(req) {
        if (!this._instance) {
            this._instance = new RegisterFormValidate(req);
        }
        return this._instance;
    }
    _rules() {
        return {
            name: { require: true, type: 'string' },
            email: { require: true, type: 'string' },
            password: { require: true, type: 'string' },
            password_confirm: { require: true, type: 'string' },
            roleId: { require: true, type: 'number' },
        };
    }
}

module.exports = RegisterFormValidate;