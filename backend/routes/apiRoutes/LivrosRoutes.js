const router = require('express').Router();

const LivrosController = require('../../controllers/api/LivrosController');
const verifyJwt = require('../../middlewares/verifyJwt');

router.get('/', verifyJwt, LivrosController.index);
router.get('/:id', verifyJwt, LivrosController.show);
router.post('/create', verifyJwt, LivrosController.store);
router.post('/edit/:id', verifyJwt, LivrosController.update);
router.delete('/:id', verifyJwt, LivrosController.destroy);

module.exports = router;