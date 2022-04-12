const bcrypt = require('bcrypt');

const User = require('../../models/Users');
const LoginFormValidate = require('../../services/validators/Auth/LoginFormValidate');
const RegisterFormValidate = require('../../services/validators/Auth/RegisterFormValidate');
const FormInputError = require('../../exceptions/FormInputError');

const createUserToken = require('../../helpers/create-user-token');
const auth = require('../../helpers/auth');
const Controller = require('../controller');


module.exports = class AuthController extends Controller {
    static async login(req, res) {
        try {
            const validator = LoginFormValidate.getInstance(req.body);
            const sanitized = validator.getSanitized();

            const {
                email,
                password
            } = sanitized;
            
            const user = await User.findOne(
                { where: { email } }
            );

            if (!user) {
                throw new Error(
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
            const validator = RegisterFormValidate.getInstance(req.body);
            const sanitized = validator.getSanitized();

            const {
                name,
                email,
                password
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
        
    }
    static async validate(req, res) {
        const currentUser = await auth(req);

        res.status(currentUser ? 200 : 401)
            .send(currentUser);
    }
    static async refresh(req, res) {
        console.log(req.user);
        res.status(req.user ? 200 : 401)
            .send(req.user);
    }
    static async logout(req, res) {
        const currentUser = await auth(req);

        res.status(currentUser ? 200 : 401)
            .send(currentUser);
    }
}