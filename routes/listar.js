const router = require('express').Router();
const listarController = require('../controllers/listarController')


router.get('/listar/:email?', listarController);

module.exports = router;