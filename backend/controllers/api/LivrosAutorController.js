const FormInputError = require('../../exceptions/FormInputError');
const LivroAutor = require('../../models/LivroAutor');
const LivroAutorStoreFormValidate = require('../../requests/validators/Autores/LivroAutorStoreFormValidate');
const Controller = require('../controller');


module.exports = class LivrosAutorController extends Controller {
    static async index(req, res) {
        try {
            const autores = await LivroAutor.findAll();

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
            const validator = new LivroAutorStoreFormValidate(req);
            const sanitized = validator.getSanitized();

            const { name } = sanitized;

            const autor = new LivroAutor({
                name,
                createdBy: req.user.id,
                activated: true,
            });

            const newAutor = await autor.save();

            res.status(200).json({
                message: 'Autor cadastrado com sucesso',
                autor: newAutor,
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
            const autorId = req.params.id;
            const autor = await LivroAutor.findOne({
                where: { id: autorId }
            });

            res.status(200).json({
                message: 'Operação efetuada com sucesso!',
                autor
            });
        } catch (error) {
            res.status(404).json({
                message: 'Autor não encontrado',
                autor: {}
            });
        }
    }
}