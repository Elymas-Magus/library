const FormInputError = require("../exceptions/FormInputError");

class FormValidate {
    #req;

    _message;
    _instance;

    constructor(req) {
        this.#req = req;
    }
    static getInstance(req) {
        if (!this._instance) {
            this._instance = new FormValidate(req);
        }
        return this._instance;
    }
    _rules() {
        return {};
    }
    _validate() {
        if (!this.#checkRules()) {
            throw new FormInputError(this.getMessage());
        }
        
        return this.#req;
    }
    #checkRules() {
        var rules = this._rules();
        var req = this.#req;
        var incorrects = Object.keys(rules)
            .filter(index => {
                let rule = rules[index];

                if (rule.require && 
                    (req[index] == undefined || req[index] == null)
                ) {
                    this._message = `O campo ${index} é obrigatório`
                    return true;
                } 
                if (
                    rule.type &&
                    rule.type.length &&
                    typeof req[index] != rule.type
                ) {
                    this._message = `O campo ${index} é deve ser do tipo ${rule.type}`
                    return true;
                }
                if (typeof req[index] == 'string') {
                    this.#req[index] = req[index].trim();
                }
                
                return false;
            });

        return ! incorrects.length
    }
    getSanitized() {
        return this._validate();
    }
    setMessage(message) {
        this._message = message;
    }
    getMessage() {
        return this._message;
    }
}

module.exports = FormValidate;