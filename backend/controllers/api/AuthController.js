const bcrypt = require('bcrypt');

const User = require('../../models/Users');
const LoginFormValidate = require('../../requests/validators/Auth/LoginFormValidate');
const RegisterFormValidate = require('../../requests/validators/Auth/RegisterFormValidate');
const FormInputError = require('../../exceptions/FormInputError');
const NotFoundException = require('../../exceptions/NotFoundException');

const createUserToken = require('../../helpers/create-user-token');
const auth = require('../../helpers/auth');
const Controller = require('../controller');
const DbService = require('../../services/DbService');
const getToken = require("../../helpers/get-token");


module.exports = class AuthController extends Controller {
    static async login(req, res) {
        try {
            const validator = new LoginFormValidate(req);
            const sanitized = validator.getSanitized();

            const {
                email,
                password
            } = sanitized;
            
            const user = await User.findOne(
                { where: { email } }
            );

            if (!user) {
                throw new NotFoundException(
                    "Usuário inexistente!"
                );
            }

            const checkPassword = bcrypt.compareSync(
                password, user.password
            );

            if (!checkPassword) {
                throw new Error(
                    "Senha incorreta!"
                );
            }

            createUserToken(user, req, res);
        } catch (error) {
            if (error instanceof FormInputError) {
                res.status(422).json({
                    message: error.message,
                });
            } if (error instanceof NotFoundException) {
                res.status(404).json({
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
    static async register(req, res) {
        try {
            const validator = new RegisterFormValidate(req.body);
            const sanitized = validator.getSanitized();

            const {
                name,
                email,
                password,
                roleId,
            } = sanitized;
            
            const existentUser = await User.findOne(
                { where: { email } }
            );

            if (existentUser) {
                throw new FormInputError(
                    "Por favor, utilize outro e-mail!"
                );
            }

            const saltRounds = 12;
            const salt = bcrypt.genSaltSync(saltRounds);
            const passwordHash = bcrypt.hashSync(password, salt);

            const user = new User({
                name,
                email,
                password: passwordHash,
                roleId,
            });

            const newUser = await user.save();

            createUserToken(newUser, req, res);
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
            const validator = new RegisterFormValidate(req.body);
            const sanitized = validator.getSanitized();

            const {
                name,
                email,
                password,
                roleId,
            } = sanitized;
            const user = req.user;
            
            const saltRounds = 12;
            const salt = bcrypt.genSaltSync(saltRounds);
            const passwordHash = bcrypt.hashSync(password, salt);

            DbService.update(user, {
                name,
                email,
                password: passwordHash,
                roleId,
            });

            const newUser = await user.save();

            createUserToken(newUser, req, res);
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
    static async validate(req, res) {
        try {
            if (!getToken(req)) {
                throw new Error("Acesso negado")
            }
            const currentUser = await auth(req);
    
            if (!currentUser) {
                throw new Error("Acesso negado");
            }

            res.status(200).send(currentUser);
        } catch (error) {
            res.status(401).send(error.message);
        }
    }
    static async refresh(req, res) {
        createUserToken(req.user, req, res);
    }
    static async logout(req, res) {
        const currentUser = await auth(req);

        res.status(currentUser ? 200 : 401).json({
            message: "deslogado com sucesso!",
        });
    }
}