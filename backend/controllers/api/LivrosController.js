const AccessException = require('../../exceptions/AccessException');
const FormInputError = require('../../exceptions/FormInputError');
const LivroAutor = require('../../models/LivroAutor');
const LivroEditora = require('../../models/LivroEditora');
const Livros = require('../../models/Livros');
const LivroStoreFormValidate = require('../../requests/validators/Livros/LivroStoreFormValidate');
const DbService = require('../../services/DbService');
const Controller = require('../controller');


module.exports = class LivrosController extends Controller {
    static async index(req, res) {
        try {
            const userId = req.user.id
            const livros = await Livros.findAll({
                where: { userId },
                include: [
                    {
                        model: LivroEditora,
                        attributes: ['name']
                    }, {
                        model: LivroAutor,
                        attributes: ['name']
                    }
                ]
            });

            res.status(200).json({
                message: 'Listagem de livros concluida com sucesso',
                livros
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: 'Livro não encontrado',
                livros: [],
                error
            });
        }
    }
    static async store(req, res) {
        try {
            const validator = new LivroStoreFormValidate(req);
            const sanitized = validator.getSanitized();

            const {
                title,
                bookAuthorId,
                bookPublisherId
            } = sanitized;

            const livro = new Livros({
                title,
                bookAuthorId,
                bookPublisherId,
                userId: req.user.id,
            });

            const newLivro = await livro.save();

            res.status(200).json({
                message: 'livro cadastrado com sucesso',
                livro: newLivro,
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
    static async update(req, res) {
        try {
            const validator = new LivroStoreFormValidate(req);
            const sanitized = validator.getSanitized();

            console.log(sanitized);

            const {
                title,
                bookAuthorId,
                bookPublisherId
            } = sanitized;

            const livroId = req.params.id;
            const livro = await Livros.findByPk(livroId);

            if (livro.userId != req.user.id) {
                throw new AccessException("Você não tem acesso!");
            }

            DbService.update(livro, {
                title,
                bookAuthorId,
                bookPublisherId,
            });
            
            const livroAtualizado = await livro.save();

            res.status(200).json({
                message: 'livro atualizado com sucesso',
                livro: livroAtualizado,
            })
        } catch (error) {
            if (error instanceof FormInputError) {
                res.status(422).json({
                    message: error.message,
                });
            } else if (error instanceof AccessException) {
                res.status(403).json({
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    message: error.message,
                });
            } 
            return;            
        }
    }
    static async show(req, res) {
        try {
            const livroId = req.params.id;
            const livro = await Livros.findByPk(livroId);

            if (livro.userId != req.user.id) {
                throw new AccessException("Você não tem acesso!");
            }

            res.status(200).json(livro);
        } catch (error) {
            if (error instanceof AccessException) {
                res.status(403).json({
                    message: error.message,
                });
            } else {
                res.status(404).json({
                    message: 'Livro não encontrado',
                });
            }
            return;
        }
    }
    static async destroy(req, res) {
        try {
            const livroId = req.params.id;
            const livro = await Livros.findByPk(livroId);

            if (livro.userId != req.user.id) {
                throw new AccessException("Você não tem acesso!");
            }

            livro.destroy();

            res.status(200).json({
                message: 'livro deletado com sucesso',
            })
        } catch (error) {
            if (error instanceof FormInputError) {
                res.status(422).json({
                    message: error.message,
                });
            } else if (error instanceof AccessException) {
                res.status(403).json({
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    message: error.message,
                });
            } 
            return;            
        }
    }
}