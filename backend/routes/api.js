const AuthRoutes = require('./apiRoutes/AuthRoutes');
const LivrosRoutes = require('./apiRoutes/LivrosRoutes');
const LivroAutoresRoutes = require('./apiRoutes/LivroAutoresRoutes');
const LivroEditorasRoutes = require('./apiRoutes/LivroEditorasRoutes');

const endPoints = {
    init(app) {
        app.use('/auth', AuthRoutes);
        app.use('/', LivrosRoutes);
        app.use('/autores', LivroAutoresRoutes);
        app.use('/editoras', LivroEditorasRoutes);
    }
}

module.exports = endPoints;