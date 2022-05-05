const router = require('express').Router();

const AuthController = require('../../controllers/api/AuthController');
const verifyJwt = require('../../middlewares/verifyJwt');

router.post('/check-user', AuthController.validate);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.patch('/edit-profile', verifyJwt, AuthController.update);
router.post('/refresh', verifyJwt, AuthController.refresh);
router.post('/logout', verifyJwt, AuthController.logout);

module.exports = router;