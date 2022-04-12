const router = require('express').Router();

const LivrosAutorController = require('../../controllers/api/LivrosAutorController');
const verifyJwt = require('../../middlewares/verifyJwt');

router.get('/', verifyJwt, LivrosAutorController.index);
router.get('/:id', verifyJwt, LivrosAutorController.show);
router.post('/create', verifyJwt, LivrosAutorController.store);

module.exports = router;