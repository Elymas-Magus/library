const router = require('express').Router();

const LivrosEditoraController = require('../../controllers/api/LivrosEditoraController');
const verifyJwt = require('../../middlewares/verifyJwt');

router.get('/', verifyJwt, LivrosEditoraController.index);
router.get('/:id', verifyJwt, LivrosEditoraController.show);
router.post('/create', verifyJwt, LivrosEditoraController.store);

module.exports = router;