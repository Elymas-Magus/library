const FormValidate = require('../../FormValidate');

class LivroEditoraStoreFormValidate extends FormValidate {
    static getInstance(req) {
        if (!this._instance) {
            this._instance = new LivroEditoraStoreFormValidate(req);
        }
        return this._instance;
    }
    _rules() {
        return {
            name: { require: true, type: 'string' },
        };
    }
}

module.exports = LivroEditoraStoreFormValidate;