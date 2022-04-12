class AccessException extends Error {
    constructor(message) {
        super(message || 'Você não possui acesso');
        this.name = "AccessException";
    }
}

module.exports = AccessException;