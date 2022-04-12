const FormValidate = require('../../FormValidate');

class LivroStoreFormValidate extends FormValidate {
    static getInstance(req) {
        if (!this._instance) {
            this._instance = new LivroStoreFormValidate(req);
        }
        return this._instance;
    }
    _rules() {
        return {
            title: { require: true, type: 'string' },
            author: { require: true, type: 'object' },
            publisher: { require: true, type: 'object' },
        };
    }
    getSanitized() {
        var sanitized = this._validate();

        return {
            title: sanitized.title,
            bookAuthorId: sanitized.author.id,
            bookPublisherId: sanitized.publisher.id,
        }
    }
}

module.exports = LivroStoreFormValidate;