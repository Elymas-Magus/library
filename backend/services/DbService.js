class DbService {
    static update(modelInstance, newContent) {
        [...Object.keys(newContent)]
            .map(key => {
                modelInstance[key] = newContent[key];
            });
    }
}

module.exports = DbService;