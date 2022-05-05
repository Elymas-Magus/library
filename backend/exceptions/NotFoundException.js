class NotFoundException extends Error {
    constructor(message) {
        super(message || 'Item não encontrado');
        this.name = "NotFoundException";
    }
}

module.exports = NotFoundException;