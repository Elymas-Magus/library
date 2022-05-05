const FormInputError = require('../../exceptions/FormInputError');
const LivroEditora = require('../../models/LivroEditora');
const LivroEditoraStoreFormValidate = require('../../requests/validators/Editoras/LivroEditoraStoreFormValidate');
const Controller = require('../controller');


module.exports = class LivrosEditoraController extends Controller {
    static async index(req, res) {
        try {
            const autores = await LivroEditora.findAll();

            res.status(200).json({
                message: 'Listagem de livros concluida com sucesso',
                autores
            });
        } catch (error) {
            res.status(404).json({
                message: 'Livro não encontrado',
                autores: []
            });
        }
    }
    static async store(req, res) {
        try {
            const validator = new LivroEditoraStoreFormValidate(req);
            const sanitized = validator.getSanitized();

            const { name } = sanitized;

            const editora = new LivroEditora({
                name,
                createdBy: req.user.id,
                activated: true,
            });

            const newEditora = await editora.save();

            res.status(200).json({
                message: 'Editora cadastrada com sucesso',
                editora: newEditora,
            })
        } catch (error) {
            if (error instanceof FormInputError) {
                res.status(422).json({
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    message: error,
                });
            } 
            return;            
        }
    }
    static async show(req, res) {
        try {
            const editoraId = req.params.id;
            const editora = await LivroEditora.findOne({
                where: { id: editoraId }
            });

            res.status(200).json({
                message: 'Operação efetuada com sucesso!',
                editora
            });
        } catch (error) {
            res.status(404).json({
                message: 'Editora não encontrada',
                editora: {}
            });
        }
    }
}