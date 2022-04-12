const FormValidate = require('../../FormValidate');

class LoginFormValidate extends FormValidate {
    static getInstance(req) {
        if (!this._instance) {
            this._instance = new LoginFormValidate(req);
        }
        return this._instance;
    }
    _rules() {
        return {
            email: { require: true, type: 'string' },
            password: { require: true, type: 'string' },
        };
    }
}

module.exports = LoginFormValidate;