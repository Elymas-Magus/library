const FormValidate = require('../../FormValidate');

class LivroAutorStoreFormValidate extends FormValidate {
    static getInstance(req) {
        if (!this._instance) {
            this._instance = new LivroAutorStoreFormValidate(req);
        }
        return this._instance;
    }
    _rules() {
        return {
            name: { require: true, type: 'string' },
        };
    }
}

module.exports = LivroAutorStoreFormValidate;