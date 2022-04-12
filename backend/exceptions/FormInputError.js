class FormInputError extends Error {
    constructor(message) {
        super(message || 'O formulário contém algum campo inválido');
        this.name = "FormInputError";
    }
}

module.exports = FormInputError;